const ApiError = require('../error/ApiError')
const { User, Media, Job, UserSkill, Skill } = require('../models/models')
const bcrypt = require('bcrypt')
const fs = require('fs')
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')
const { badRequest } = require('../error/ApiError')
const { Op } = require('sequelize')
const { users } = require('../defaultData')

const HASH_QUANTITY = 4;

async function getUserFromDB(phone, email) {
  let user = await User.findOne({ where: { phone } });
  if (!user && email) {
    user = await User.findOne({ where: { email } });
  }
  return user;
}

const generateJwt = (id) => {
  return jwt.sign(
    { id },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
}

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, phone, photoUri, photoW, photoH, about, pass } = req.body;
      const existingUser = await getUserFromDB(phone, email);
      let fileName;
      if (!existingUser) {

        if (photoUri && photoUri.indexOf('data:image/') >= 0) {
          const regExMatches = photoUri.match('data:(image/.*);base64,(.*)');
          const imageData = {
            imageType: '.' + regExMatches[1].split('/')[1],
            dataBuffer: Buffer.from(regExMatches[2], 'base64')
          }
          fileName = uuid.v4() + imageData.imageType;
          const filePath = path.resolve(__dirname, '../static', 'avatars', fileName);

          fs.writeFile(filePath, imageData.dataBuffer, (err) => {
            if (err) {
              console.log(err)
            }
            console.log("File written successfully");
          })
        } else {
          console.log('photo warning: not base64 format')
          // console.log(photoUri)
        }

        const hashPass = await bcrypt.hash(pass, HASH_QUANTITY);
        const createdAt = new Date();
        const newUser = await User.create({
          name,
          email,
          phone,
          about,
          pass: hashPass,
          createdAt,
          updatedAt: createdAt
        })
        if (photoUri) {
          const newMedia = await Media.create({
            userId: newUser.id,
            fileName: fileName,
            width: photoW || 0,
            height: photoH || 0
          })
        }

        const token = generateJwt(newUser.id, newUser.phone)
        return res.json(token);
      }
      if (email) {
        return next(ApiError.badRequest('Аккаунт с таким номером или почтой уже существует'))
      }
      //else if phone exists
      return next(ApiError.badRequest('Аккаунт с таким номером уже существует'))
    } catch (e) {
      // console.log(e)
    }
  }

  async update(req, res, next) {
    // console.log(req.query)
    const { query } = req;
    const { id } = query
    if (!id)
      return next(ApiError(badRequest('ID not found')))
    const queryObj = {};
    for (const el in query) {
      for (let key in User.rawAttributes) {
        if (key == el && key != 'id') {
          queryObj[el] = query[el];
        }
      }
    }
    const updatedAt = new Date();
    const userId = await User.update(
      { ...queryObj, updatedAt },
      { where: { id } }
    )
    return res.json(userId);
  }

  async login(req, res, next) {
    const { pass, phoneOrEmail } = req.query;

    const user = await getUserFromDB(phoneOrEmail, phoneOrEmail);
    if (!user) {
      return next(ApiError.badRequest('Аккаунт с таким номером или почтой не существует'))
    }

    let comparePass = bcrypt.compareSync(pass, user.pass);
    if (comparePass) {
      // login
      const token = generateJwt(user.id, user.phone);
      return res.json({ token });
    }

    return next(ApiError.unauthorized('Пароль неверный'))
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.phone);
    return res.json({ token })
  }

  async get(req, res, next) {
    const { id } = req.query;
    if (!id) return next(ApiError.badRequest('ID not found'));
    const user = await User.findByPk(id);
    const photo = await Media.findOne({ where: { userId: id } });
    const userSkills = await UserSkill.findAll({ where: { userId: id } });
    const skillIds = userSkills.map(el => el.skillId)
    const skills = skillIds.length > 0 //if 0 length findAll returns all skills
      ? await Skill.findAll({
        where: {
          id: {
            [Op.or]: skillIds
          }
        }
      })
      : [];
    return res.json({
      rating: user.avgRating,
      name: user.name,
      phone: user.phone,
      email: user.email,
      createdAt: user.createdAt,
      about: user.about,
      photo: photo?.fileName,
      skills: skills.map(el => el.name)
    })
  }

  // [1,2,3,4]
  // [{name:1},{name:2}]
  async getAll(req, res, next) {
    const users = await User.findAll();
    let allSkills = await Skill.findAll()
    allSkills = allSkills.map(el => el.dataValues)
    // console.log(allSkills)
    const preparedUsers = users.map(async el => {
      // console.log('id: ' + el.dataValues.id)
      const photo = await Media.findOne({ where: { userId: el.dataValues.id } })
      const completedJobs = await Job.findAndCountAll({
        where: {
          status: 'completed',//pending/in progress
          userId: el.dataValues.id
        }
      })
      let userSkills = await UserSkill.findAll({
        where: {
          userId: el.dataValues.id
        }
      })
      userSkills = userSkills.map(el => {
        return allSkills[allSkills.map(el => el.id).indexOf(el.dataValues.skillId)].name;
      })
      // if (photo) {
      //   console.log(photo.dataValues.userId)
      // }
      return {
        id: el.dataValues.id,
        name: el.dataValues.name,
        avgRating: el.dataValues.avgRating,
        about: el.dataValues.about,
        photoUri: photo?.dataValues?.fileName || '',
        completedJobsCount: completedJobs?.count || 0,
        skills: userSkills,
      }
    })
    Promise.all(preparedUsers).then(result => {
      return res.json(result)
    })
  }
}

module.exports = new UserController();
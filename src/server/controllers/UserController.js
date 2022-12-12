const ApiError = require('../error/ApiError')
const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const HASH_QUANTITY = 4;

async function getUserFromDB(phone, email) {
  let user = await User.findOne({ where: { phone } });
  if (!user && email) {
    user = await User.findOne({ where: { email } });
  }
  return user;
}

const generateJwt = (id, phone) => {
  return jwt.sign(
    { id, phone },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
}

class UserController {

  async registration(req, res, next) {
    try {
      const { name, email, phone, photo, about, pass } = req.body;
      console.log('111111')
      const existingUser = await getUserFromDB(phone, email);
      if (!existingUser) {
        const hashPass = await bcrypt.hash(pass, HASH_QUANTITY);
        const createdAt = new Date();
        const newUser = await User.create({
          name,
          email,
          phone,
          about,
          pass: hashPass,
          photo,
          createdAt,
          updatedAt: createdAt
        })
        const token = generateJwt(newUser.id, newUser.phone)
        return res.json(token);
      }
      if (email) {
        return next(ApiError.badRequest('Аккаунт с таким номером или почтой уже существует'))
      }
      //else if phone exists
      return next(ApiError.badRequest('Аккаунт с таким номером уже существует'))
    } catch (e) {
      console.log(e)
    }
  }

  async update(req, res) {
    const query = req.query;
    // req.query
    // const columnNames = await
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
      { where: { id: query.id } }
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

  async getAll(req, res, next) {
    const users = await User.findAll();
    return res.json(users)
  }
}

module.exports = new UserController();
const ApiError = require('../error/ApiError')
const { User } = require('../models/models')

class UserController {
  async registration(req, res) {
    const { name, email, phone, photo, about, pass } = req.body;
    // const fixedEmail = email.toLowerCase();
    // const fixedPhone = phone.replace(/\D+/g, '');
    const createdAt = new Date();

    const user = await User.create({
      name,
      email,
      phone,
      about,
      pass,
      photo,
      createdAt,
      updatedAt: createdAt
    })
    return res.json(user);
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

    let userId = await User.findOne({ where: { phone: phoneOrEmail } });
    if (!userId)
      userId = await User.findOne({ where: { email: phoneOrEmail } });
    if (!userId)
      return next(ApiError.invalidArgumentException('User with this name or email not found, check name'))
    if (pass == userId.pass) {
      // login
      return res.json(userId);
    }
    return next(ApiError.unauthorized('Wrong password'))


  }
  async check(req, res, next) {
    // console.log(req.query)
    // console.log(res)
    const { id } = req.query
    if (!id) {
      return next(ApiError.badRequest('Не задан ID'))
    }
    res.json(req.query);
  }
  async getAll(req, res, next) {
    const users = await User.findAll();
    return res.json(users)
  }
}

module.exports = new UserController();
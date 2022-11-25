const ApiError = require('../error/ApiError')
const { User } = require('../models/models')

class UserController {
  async registration(req, res) {

    // console.log(req.body)
    const { name, email, phone, pass } = req.body;
    const createdAt = new Date();
    const user = await User.create({ name, email, phone, pass, createdAt, updatedAt: createdAt })

    return res.json(user);
  }

  async update(req,res){
    // const { rate, ratedUserId, userId } = req.query;
    req.query
    // const oldDate = await Rating.findOne({ where: { ratedUserId: ratedUserId, userId: userId } });
    // // return res.json(oldRating)
    // const rating = await Rating.update(
    //   { rate },
    //   { where: { id: oldRating.id } }
    // )
    // return res.json(rating);

  }
  async login(req, res) {

  }
  async check(req, res, next) {
    console.log(req.query)
    // console.log(res)
    const { id } = req.query
    if (!id) {
      return next(ApiError.badRequest('Не задан ID'))
    }
    res.json(req.query);
  }
}

module.exports = new UserController();
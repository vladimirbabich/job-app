const ApiError = require('../error/ApiError')
const { Rating } = require('../models/models')
class RatingController {
  async create(req, res) {
    const { rate, ratedUserId, userId } = req.body;
    const rating = await Rating.create({ rate, ratedUserId, userId })

    return res.json(rating);
  }
  async get(req, res) {

  }
}

module.exports = new RatingController();
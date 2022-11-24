const ApiError = require('../error/ApiError')
const { Rating } = require('../models/models')
class RatingController {
  async create(req, res) {
    const { rate, ratedUserId, userId } = req.body;
    const rating = await Rating.create({ rate, ratedUserId, userId })

    return res.json(rating);
  }
  async update(req, res) {
    const { rate, ratedUserId, userId } = req.body;
    const oldRating = await Rating.findOne({ where: { ratedUserId: ratedUserId, userId: userId } });
    // return res.json(oldRating)
    const rating = await Rating.update(
      { rate },
      { where: { id: oldRating.id } }
    )
    return res.json(rating);
  }
  async get(req, res) {

  }
}

module.exports = new RatingController();
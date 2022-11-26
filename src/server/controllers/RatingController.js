const ApiError = require('../error/ApiError')
const { Rating } = require('../models/models')
const { User } = require('../models/models')

async function updateUserRating(ratedUserId) {
  const ratedUserRates = await Rating.findAll({ where: { ratedUserId: ratedUserId } })
  let sumOfRates = 0;
  for (const key in ratedUserRates) {
    sumOfRates += ratedUserRates[key].rate;
  }
  const avg = (sumOfRates / ratedUserRates.length).toFixed(2);

  const ratedUser = await User.update(
    { avgRating: avg },
    { where: { id: ratedUserId } })
}
class RatingController {
  async create(req, res) {
    console.log('hui')
    const { rate, ratedUserId, userId } = req.body;
    const rating = await Rating.create({ rate, ratedUserId, userId })

    updateUserRating(ratedUserId);
    return res.json(rating);
  }

  async update(req, res) {
    const { rate, ratedUserId, userId } = req.query;
    const oldRating = await Rating.findOne({
      where: {
        ratedUserId: ratedUserId,
        userId: userId
      }
    });
    // return res.json(oldRating)
    const rating = await Rating.update(
      { rate },
      { where: { id: oldRating.id } }
    )

    updateUserRating(ratedUserId);
    return res.json(rating);
  }

  async get(req, res) {
    //get this users rates(userId)
    //then if user already rate ratedUserId -> update, else -> create
    const { userId, ratedUserId } = req.query;
    const rating = await Rating.findOne({
      where: {
        userId,
        ratedUserId
      }
    })
    return res.json(rating)
  }
}

module.exports = new RatingController();
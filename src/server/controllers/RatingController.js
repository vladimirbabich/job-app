const ApiError = require('../error/ApiError')
const { Rating } = require('../models/models')
const { User } = require('../models/models')

class RatingController {
  async create(req, res) {
    const { rate, ratedUserId, userId } = req.body;
    const rating = await Rating.create({ rate, ratedUserId, userId })
    // const user = await User
    return res.json(rating);
  }
  async update(req, res) {
    const { rate, ratedUserId, userId } = req.query;
    const oldRating = await Rating.findOne({ where: { ratedUserId: ratedUserId, userId: userId } });
    // return res.json(oldRating)
    const rating = await Rating.update(
      { rate },
      { where: { id: oldRating.id } }
    )
    return res.json(rating);
  }

  async updateAll(req, res) {//get avg of types for every user an
    const { userId } = req.query
    // console.log(userId);

    const rates = await Rating.findAll({
      where: {
        ratedUserId: userId
      }
    });
    console.log('rates: ' + rates);
    const initialValue = 0;
    const sum = rates.reduce((accumulator, el) => {
      console.log('accumulator: ' + accumulator);
      console.log('el: ' + el.rate);
      return accumulator + el.rate;
    }, initialValue)
    console.log('sum: ' + sum);

    const avg = (sum / rates.length).toFixed(2);
    return res.json(avg);
  }
}

module.exports = new RatingController();
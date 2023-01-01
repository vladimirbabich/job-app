const { Op } = require('sequelize');
const ApiError = require('../error/ApiError')
const { Rating } = require('../models/models')
const { User } = require('../models/models')

const updateUserAvgRating = async (id) => {
  const ratingsOfUser = await Rating.findAndCountAll({ where: { ratedUserId: id } })
  if (ratingsOfUser?.rows instanceof Array) {
    const sum = ratingsOfUser.rows.reduce(
      (accumulator, el) =>
        el?.dataValues?.rate + accumulator, 0);
    const avgRating = (sum / ratingsOfUser.count).toFixed(1)
    const user = await User.update(
      { avgRating },
      { where: { id: id } }
    );
    if (!user) return next(ApiError.badRequest('ratedUserId somehow not found'))


    return avgRating;
  } else {
    return next(ApiError.badRequest('0 ratings of ratedUserId in DB'))
  }
}

class RatingController {
  updateUserAvgRating = async (id) => {
    const ratingsOfUser = await Rating.findAndCountAll({ where: { ratedUserId: id } })
    if (ratingsOfUser?.rows instanceof Array) {
      const sum = ratingsOfUser.rows.reduce(
        (accumulator, el) =>
          el?.dataValues?.rate + accumulator, 0);
      const avgRating = (sum / ratingsOfUser.count).toFixed(1)
      const user = await User.update(
        { avgRating },
        { where: { id: id } }
      );
      return res.json(avgRating);
    } else {
      return next(ApiError.badRequest('0 ratings of ratedUserId in DB'))
    }
  }
  async create(req, res) {
    try {
      const { rate, userId, ratedJobId, ratedUserId } = req.body;
      if (ratedJobId) {
        const rating = await Rating.create({ rate, userId, ratedJobId });
        return res.json(rating);
      }
      if (ratedUserId) {
        const rating = await Rating.create({ rate, userId, ratedUserId });
        const avgRating = await updateUserAvgRating(ratedUserId)
        if (avgRating) return res.json(avgRating);
        return res.json(rating);
      }
      return next(ApiError.invalidArgumentException('no [rated Id] was requested'));
    } catch (e) {
      return console.log(e);
    }
  }

  async update(req, res, next) {
    try {
      const { ratedUserId, ratedJobId, rate, userId } = req.query
      let rating;
      if (ratedUserId) {
        rating = await Rating.update(
          { ratedUserId, rate, userId },
          { where: { ratedUserId, userId } }
        )
      } else if (ratedJobId) {
        rating = await Rating.update(
          { ratedJobId, rate, userId },
          { where: { ratedJobId, userId } }
        )
      }
      if (!rating) return res.json({ message: 'type proper (ratedUserId / ratedJobId) & userId' })

      if (ratedUserId) {
        const avgRating = await updateUserAvgRating(ratedUserId)
        if (avgRating) return res.json(avgRating);
      }
      //here should be same code for ratedJobId, mb will do it later

      return res.json(rating)//update completed, but not updating avgRating in User Table
    }
    catch (e) {
      return next(ApiError.invalidArgumentException(e.message));
    }
  }

  async getJobRates(req, res) {

  }
  async getUserRates(req, res) {

  }
}

module.exports = new RatingController();
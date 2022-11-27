const ApiError = require('../error/ApiError')
const { Rating } = require('../models/models')
const { User } = require('../models/models')

class RatingController {
  async create(req, res) {
    try {
      const { rate, userId, ratedJobId, ratedUserId } = req.body;
      if (ratedJobId) {
        const rating = await Rating.create({ rate, userId, ratedJobId });
        return res.json(rating);
      }
      if (ratedUserId) {
        const rating = await Rating.create({ rate, userId, ratedUserId });
        return res.json(rating);
      }
      return next(ApiError.invalidArgumentException('no [rated Id] was requested'));
    } catch (e) {
      return console.log(e);
    }
  }

  async update(req, res, next) {
    try {
      const queryObj = {};
      for (const el in req.query) {
        for (let key in Rating.rawAttributes) {
          if (key == el) {
            if (key == 'id') continue;
            queryObj[el] = req.query[el];
          }
        }
      }
      // return res.json(req.query.id);
      // console.log(req)
      const rating = await Rating.update(
        { ...queryObj },
        { where: { id: req.query.id } }
      )
      return res.json(rating);
    }
    catch (e) {
      return next(ApiError.invalidArgumentException(e));
    }
  }

  async getJobRates(req, res) {

  }
  async getUserRates(req, res) {

  }
}

module.exports = new RatingController();
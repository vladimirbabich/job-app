const { Job } = require('../models/models')
const ApiError = require('../error/ApiError')

class JobController {
  async create(req, res) {
    const {
      workAddress,
      workList,
      deadline,
      price,
      userId
    } = req.body;
    const createdAt = new Date();

    const job = await Job.create({
      workAddress,
      workList,
      deadline: new Date(deadline),
      price,
      userId,
      createdAt,
      updatedAt: createdAt
    });

    return res.json(job);
  }
  async update(req, res) {

  }
  async get(req, res) {

  }
  async getAll(req, res) {

  }
}

module.exports = new JobController();
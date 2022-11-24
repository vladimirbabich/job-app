const { Job } = require('../models/models')
const ApiError = require('../error/ApiError');
const { json } = require('sequelize');

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
    const jobs = await Job.findAll();
    // console.log(jobs)
    console.dir(jobs)
    return res.json(jobs);
  }
}

module.exports = new JobController();
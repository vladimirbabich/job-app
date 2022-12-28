const { Job, Media } = require('../models/models')
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
    const bodyObj = {};
    const body = req.body;
    for (const el in body) {
      for (let key in Job.rawAttributes) {
        if (key == el) {
          if (key == 'id' || key == 'userId') continue;
          bodyObj[el] = req.body[el];
        }
      }
    }

    const updatedAt = new Date();
    const job = await Job.update(
      { ...bodyObj, updatedAt },
      { where: { id: body.id } }
    )
    return res.json(job);
  }

  async getAll(req, res) {
    const jobs = await Job.findAll();
    const jobsWithMediaPromises = jobs.map(async el => {
      const media = await Media.findAll({ where: { jobId: el.dataValues.id } });
      if (media.length > 0)
        return { ...el.dataValues, media: media }
      return { ...el.dataValues }
    })
    
    Promise.all(jobsWithMediaPromises).then(result => {
      return res.json(result);
    })
  }
}
module.exports = new JobController();

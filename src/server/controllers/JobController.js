const { Job, Media } = require('../models/models')
const ApiError = require('../error/ApiError');
const { json } = require('sequelize');
const { writeFile, generateJwt } = require('../../support-features/server-utils');


class JobController {
  async create(req, res) {
    try {
      const {
        workAddress,
        workList,
        price,
        userId,
        deadline,
        photoUri,
        photoW,
        photoH,
        status
      } = req.body;
      const createdAt = new Date();

      const job = await Job.create({
        workAddress: workAddress,
        workList: workList,
        deadline: deadline ? new Date(deadline) : null,
        price,
        userId,
        status,
        createdAt,
        updatedAt: createdAt
      });

      if (photoUri && photoUri.indexOf('data:') >= 0) {
        const fileName = writeFile(photoUri, 'job-photos');
        const media = await Media.create({
          jobId: job.dataValues.id,
          fileName: fileName,
          width: photoW || 0,
          height: photoH || 0
        })
      }

      const token = generateJwt({ id: req.user.id, phone: req.user.phone })
      return res.json(token);
    }
    catch (e) {
      res.json({ message: e.message })
    }
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
    const jobs = await Job.findAll({ where: { status: 'pending' } });
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

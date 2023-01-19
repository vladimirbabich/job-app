const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')
const { Media } = require('../models/models')
class MediaController {
  async create(req, res, next) {
    try {
      const { jobId } = req.body;
      const { file } = req.files;
      let fileName, originalName;
      if (file instanceof Array) {
        const names = [];
        file.map((el, i) => {
          const splittedFileName = el.name.split('.');
          const imgFormat = splittedFileName[splittedFileName.length - 1];
          fileName = uuid.v4() + '.' + imgFormat;
          originalName = el.name;
          names.push({ fileName, jobId, originalName });
          el.mv(path.resolve(__dirname, '../static', 'job-photos', fileName));
        })

        const media = await Media.bulkCreate(names)
        return res.json(media);
      }
      //else
      const splittedFileName = file.name.split('.');
      const imgFormat = splittedFileName[splittedFileName.length - 1];
      fileName = uuid.v4() + '.' + imgFormat;
      originalName = file.name;
      console.log(file)
      file.mv(path.resolve(__dirname, '../static', 'job-photos', fileName));
      const media = await Media.create({ fileName, jobId, originalName })
      return res.json(media);
    } catch (e) {
      console.log(e.message)
      next(ApiError.badRequest(e.message));
    }
  }

  async lazyCreate(req, res, next) {
    try {
      const { jobId, userId, fileName, width, height } = req.query;
      if ((!jobId && !userId) || !fileName) {
        next(ApiError.badRequest('wrong data in MediaController request'));
      }
      // console.log(req.query)
      const media = await Media.create({ fileName, jobId, userId, width, height })
      return res.json(media);
    } catch (e) {
      console.log(e.message)
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res) {
    const { jobId } = req.query
    // return res.json(jobId);
    // const media = Media.findAll()
    // return res.json(media);
    const medias = await Media.findAll({ where: { jobId: jobId } })
    return res.json(medias);
  }
}

module.exports = new MediaController();
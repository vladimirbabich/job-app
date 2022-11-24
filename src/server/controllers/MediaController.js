const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')
const { Media } = require('../models/models')
class MediaController {
  async create(req, res, next) {
    try {
      const { jobId } = req.body;
      const { file } = req.files;
      console.dir(file)
      let fileName, originalName;
      if (file instanceof Array) {
        const names = [];
        file.map((el, i) => {
          const splittedFileName = el.name.split('.');
          const imgFormat = splittedFileName[splittedFileName.length - 1];
          fileName = uuid.v4() + '.' + imgFormat;
          originalName = el.name;
          names.push({ fileName, jobId, originalName });
          el.mv(path.resolve(__dirname, '..', 'static', fileName));
        })

        const media = await Media.bulkCreate(names)
        return res.json(media);
      } else {
        const splittedFileName = file.name.split('.');
        const imgFormat = splittedFileName[splittedFileName.length - 1];
        fileName = uuid.v4() + '.' + imgFormat;
        originalName = file.name;
        file.mv(path.resolve(__dirname, '..', 'static', fileName));
        const media = await Media.create({ fileName, jobId, originalName })
        return res.json(media);
      }

    } catch (e) {
      console.log('hiu')
      next(ApiError.badRequest(e.message));
    }
  }
  async get(req, res) {

  }
}

module.exports = new MediaController();
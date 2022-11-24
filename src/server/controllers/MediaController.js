const ApiError = require('../error/ApiError')
const { Media } = require('../models/models')
class MediaController {
  async create(req, res) {
    const { fileName, url, jobId } = req.body;
    const media = await Media.create({ fileName, url, jobId })

    return res.json(media);
  }
  async get(req, res) {

  }
}

module.exports = new MediaController();
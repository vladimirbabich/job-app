const ApiError = require('../error/ApiError')
const { UserSkill } = require('../models/models')

class UserSkillController {
  async create(req, res, next) {
    const { userId, skillId } = req.body;

    const skillsDB = await UserSkill.findAll({ where: { userId } });
    if (skillsDB.length > 0) {
      const skillIds = skillsDB.map(el => {
        return el.skillId;
      })
      if (skillIds.includes(skillId)) {
        return next(ApiError.invalidArgumentException('skill already added'));
      }
    }
    const newDBSkill = await UserSkill.create({ userId, skillId })
    return res.json(newDBSkill);
  }

  async delete(req, res) {
    const { userId, skillId } = req.query;
    const delSkill = await UserSkill.destroy(
      { where: { userId, skillId } });
    return res.json(delSkill)
  }

  async getAll(req, res) {//for userId
    const { userId } = req.query
    const skills = await UserSkill.findAll({ where: { userId } });
    return res.json(skills)
  }
}

module.exports = new UserSkillController();
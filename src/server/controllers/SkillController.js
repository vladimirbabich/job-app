const ApiError = require('../error/ApiError')
const { Skill } = require('../models/models')

class SkillController {
  async create(req, res, next) {
    const skillsDB = await Skill.findAll();
    const { name } = req.body;

    if (skillsDB.length > 0) {
      skillsDB.map(async (el) => {
        // console.log(el)
        if (!el.name == name) {
          const newDBSkill = await Skill.create({ name })
          return res.json(newDBSkill);
        }
      })
    }
    const newDBSkill = await Skill.create({ name })
    return res.json(newDBSkill);

  }

  async update(req, res) {
    const { id, name } = req.query;
    const updSkill = await Skill.update(
      { name },
      { where: { id } });
    return res.json(updSkill)
  }

  async getAll(req, res) {
    const skills = await Skill.findAll();
    return res.json(skills)
  }
}

module.exports = new SkillController();
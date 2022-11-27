const Router = require('express')
const router = new Router();

const userSkillController = require('../controllers/UserSkillController')

router.post('/', userSkillController.create);//ok
router.delete('/delete', userSkillController.delete);//
router.get('/getall', userSkillController.getAll);//

module.exports = router

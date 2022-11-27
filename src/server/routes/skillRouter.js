const Router = require('express')
const router = new Router();

const skillController = require('../controllers/SkillController')

router.post('/', skillController.create);//
router.get('/update', skillController.update);//
router.get('/', skillController.getAll);//

module.exports = router

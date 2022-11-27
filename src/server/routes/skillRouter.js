const Router = require('express')
const router = new Router();

const skillController = require('../controllers/SkillController')

router.post('/', skillController.create);//ok
router.get('/update', skillController.update);//
router.get('/getall', skillController.getAll);//

module.exports = router

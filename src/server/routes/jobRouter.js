const Router = require('express')
const router = new Router();
const jobController = require('../controllers/JobController')

router.post('/', jobController.create);//ok
router.post('/update', jobController.update);//ok
router.get('/getall', jobController.getAll);//ok

module.exports = router

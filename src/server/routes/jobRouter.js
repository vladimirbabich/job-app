const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware')
const jobController = require('../controllers/JobController')

router.post('/', authMiddleware, jobController.create);//ok
router.post('/update', jobController.update);//ok
router.get('/getall', jobController.getAll);//ok

module.exports = router

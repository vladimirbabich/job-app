const Router = require('express')
const router = new Router();
const jobController = require('../controllers/JobController')

router.post('/', jobController.create);
// router.post('/', jobController.update);
// router.get('/', jobController.get);
router.get('/', jobController.getAll);

module.exports = router

const Router = require('express')
const router = new Router();

const reviewController = require('../controllers/ReviewController')

router.post('/', reviewController.create);//
router.get('/update', reviewController.update);//
router.get('/', reviewController.get);//

module.exports = router

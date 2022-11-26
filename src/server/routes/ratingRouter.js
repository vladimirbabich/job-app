const Router = require('express')
const router = new Router();

const ratingController = require('../controllers/RatingController')

router.post('/', ratingController.create);//ok
router.get('/update', ratingController.update);//ok

module.exports = router

const Router = require('express')
const router = new Router();

const ratingController = require('../controllers/RatingController')

router.post('/', ratingController.create);
router.post('/update', ratingController.update);
router.get('/', ratingController.get);

module.exports = router

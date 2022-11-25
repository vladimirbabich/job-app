const Router = require('express')
const router = new Router();

const ratingController = require('../controllers/RatingController')

router.post('/', ratingController.create);
router.get('/update', ratingController.update);
// router.get('/updateall', ratingController.updateAll);

module.exports = router

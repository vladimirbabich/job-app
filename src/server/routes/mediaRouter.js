const Router = require('express')
const router = new Router();

const mediaController = require('../controllers/MediaController')

router.post('/', mediaController.create);//ok
router.get('/lazy', mediaController.lazyCreate);//ok (only for tested db injection)
router.get('/', mediaController.get);//ok - get all medias of jobId

module.exports = router

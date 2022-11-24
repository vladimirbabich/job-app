const Router = require('express')
const router = new Router();

const mediaController = require('../controllers/MediaController')

router.post('/', mediaController.create);
router.get('/', mediaController.get);

module.exports = router

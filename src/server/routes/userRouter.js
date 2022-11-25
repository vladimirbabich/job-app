const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/update', userController.update);
router.get('/auth', userController.check);

module.exports = router
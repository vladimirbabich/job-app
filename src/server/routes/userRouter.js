const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');

router.post('/registration', userController.registration);//ok
router.get('/update', userController.update);//ok
router.get('/login', userController.login);//later
router.get('/auth', userController.check);//later
router.get('/getall', userController.getAll);//ok

module.exports = router
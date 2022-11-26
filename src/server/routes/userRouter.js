const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');

router.post('/registration', userController.registration);//ok
router.get('/update', userController.update);//ok but change to update photo
router.get('/login', userController.login);//ok but need to learn how to really login in app
router.get('/auth', userController.check);//will learn about proper way to do that
router.get('/getall', userController.getAll);//will learn about proper way to do that

module.exports = router
const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/UserController');

router.post('/registration', userController.registration);//ok
router.get('/update', userController.update);//ok
router.get('/login', userController.login);//ok
router.get('/auth', authMiddleware, userController.check);//later
router.get('/getall', userController.getAll);//ok
router.get('/get', userController.get);//

module.exports = router
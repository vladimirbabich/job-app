const Router = require('express')
const router = new Router();
const userRouter = require('./userRouter')
const jobRouter = require('./jobRouter')
const mediaRouter = require('./mediaRouter')
const ratingRouter = require('./ratingRouter')



router.use('/user', userRouter);
router.use('/job', jobRouter);
router.use('/media', mediaRouter);
router.use('/rating', ratingRouter);

module.exports = router
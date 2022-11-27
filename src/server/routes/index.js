const Router = require('express')
const router = new Router();
const userRouter = require('./userRouter')
const jobRouter = require('./jobRouter')
const mediaRouter = require('./mediaRouter')
const ratingRouter = require('./ratingRouter')
const reviewRouter = require('./ratingRouter')
const skillRouter = require('./ratingRouter')



router.use('/user', userRouter);
router.use('/job', jobRouter);
router.use('/media', mediaRouter);
router.use('/rating', ratingRouter);
router.use('/review', reviewRouter);
router.use('/skill', skillRouter);

module.exports = router
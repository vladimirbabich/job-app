const Router = require('express')
const router = new Router();
const userRouter = require('./userRouter')
const jobRouter = require('./jobRouter')
const mediaRouter = require('./mediaRouter')
const ratingRouter = require('./ratingRouter')
const skillRouter = require('./skillRouter')
const userSkillRouter = require('./userSkillRouter')



router.use('/skill', skillRouter);//ok
router.use('/user', userRouter);//ok
router.use('/job', jobRouter);//ok
router.use('/media', mediaRouter);//ok
router.use('/rating', ratingRouter);//ok
router.use('/userskill', userSkillRouter);

module.exports = router
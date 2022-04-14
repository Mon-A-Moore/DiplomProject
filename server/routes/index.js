const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const сompanyRouter = require('./companyRouter');
const balanceRouter = require('./balanceRouter');

router.use('/user', userRouter);
router.use('/company', сompanyRouter);
router.use('/balance', balanceRouter);

module.exports = router;

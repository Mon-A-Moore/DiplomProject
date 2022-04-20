const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const сompanyRouter = require('./companyRouter');
const balanceRouter = require('./balanceRouter');
const factoryRouter = require('./factoryRouter');

router.use('/user', userRouter);
router.use('/company', сompanyRouter);
router.use('/balance', balanceRouter);
router.use('/factory', factoryRouter);

module.exports = router;

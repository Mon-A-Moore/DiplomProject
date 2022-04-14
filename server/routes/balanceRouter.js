const Router = require('express');
const router = new Router();
const balanceController = require('../controllers/balanceController')

router.post('/balanceCalculation',balanceController.balanceCalculation);
router.put('/update',balanceController.balanceUpdate);
router.get('/:companyId/:id',balanceController.getOne);
router.get('/:companyId',balanceController.getAll);
router.get('/:companyId/:dataStart/:dataEnd',balanceController.DateSort);
router.delete('/',balanceController.deleteOne)

module.exports = router;

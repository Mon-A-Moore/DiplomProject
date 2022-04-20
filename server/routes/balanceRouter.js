const Router = require('express');
const router = new Router();
const balanceController = require('../controllers/balanceController')

router.post('/balanceCalculation/:factoryId',balanceController.balanceCalculation);
router.put('/update',balanceController.balanceUpdate);
router.get('/:factoryId/:id',balanceController.getOne);
router.get('/:factoryId',balanceController.getAll);
router.get('/:factoryId/:dataStart/:dataEnd',balanceController.DateSort);
router.delete('/',balanceController.deleteOne)

module.exports = router;

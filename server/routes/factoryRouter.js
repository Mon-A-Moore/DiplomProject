const Router = require('express');
const router = new Router();
const factoryController = require('../controllers/factoryController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',factoryController.create);
router.get('/:companyId', factoryController.getAllfactoryCompany);
router.delete('/:id',factoryController.delete)
module.exports = router;
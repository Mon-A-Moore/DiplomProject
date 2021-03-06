const Router = require('express');
const router = new Router();
const companyController = require('../controllers/companyController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(['EMPLOYEE','ADMIN']),companyController.create);
router.put('/', checkRole(['EMPLOYEE','ADMIN']),companyController.update);
router.post('/addusers', checkRole(['EMPLOYEE','ADMIN']),companyController.addUsersCompany);
router.get('/:id' , companyController.getOne);
router.get('/',/*checkRole('ADMIN') ,*/ companyController.getAll);
router.post('/getusers',checkRole(['EMPLOYEE','ADMIN']) , companyController.getUsersCompany);
router.post('/deleteusers',checkRole(['EMPLOYEE','ADMIN']) , companyController.deleteUsersCompany);
router.delete('/:id',checkRole(['EMPLOYEE','ADMIN']) ,companyController.deleteOne)

router.post('/info',checkRole(['EMPLOYEE','ADMIN']) , companyController.CompanyInfoUpdate);

router.post('/news',checkRole(['EMPLOYEE','ADMIN']) , companyController.CompanyNewsUpdate);


module.exports = router;

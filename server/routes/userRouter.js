const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.get('/all/:id', checkRole(['EMPLOYEE','ADMIN']), userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/checkUser', userController.checkUserCompany);
router.delete('/delete/:id', userController.deleteId);

module.exports = router;

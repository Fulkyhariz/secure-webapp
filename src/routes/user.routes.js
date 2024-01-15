const userController = require('../controllers/user.controller');
const { authenticateJWT, authenticateRefreshJWT } = require('../middleware/auth.middleware');
const { registerValidation, loginValidation, validate, updateValidation } = require('../validator/user.validator');
const router = require('express').Router();

router.post('/register', registerValidation(), validate ,userController.register);
router.post('/login', loginValidation(), validate ,userController.login);
router.get('/profile', authenticateJWT ,userController.findOne);
router.put('/profile', updateValidation(), validate ,authenticateJWT ,userController.update);
router.post('/token', authenticateRefreshJWT ,userController.token);

module.exports = router;

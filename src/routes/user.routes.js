const userController = require('../controllers/user.controller');
const { registerValidation } = require('../validator/user.validator');
const router = require('express').Router();

router.post('/register', registerValidation ,userController.register);
router.post('/login', registerValidation ,userController.login);

module.exports = router;

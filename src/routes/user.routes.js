const userController = require('../controllers/user.controller');
const { registerValidation } = require('../validator/user.validator');
const router = require('express').Router();

router.post('/register', registerValidation ,userController.register);

module.exports = router;

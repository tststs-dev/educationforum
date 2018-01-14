/**
 * Created by Stas on 20.07.2017.
 */
const express = require('express');
const router = express.Router();

const controller = require('../controllers/sessionController');
const validator = require('../validators/sessionValidatior');

router.post('/login', validator.validateLogin, controller.login);
router.post('/register', validator.validateRegister, controller.register);
router.post('/free-email', validator.validateFreeEmail, controller.checkEmail);

//router.post('/resend-confirm-msg', controller.resendConfirmMSG);
//router.post('/recover-password', controller.recoverPassword);
router.get('/confirm-email', validator.validateConfirmEmail, controller.confirmEmail);

router.patch('/logout', controller.checkAccessToken, controller.logout);
router.patch('/refresh-tokens', controller.refreshToken);

module.exports = router;

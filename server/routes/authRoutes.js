const { Router } = require('express');
const authController = require('../controllers/authController.js');
const verifyJWT = require('../middleware/verifyJWT.js');
const router = Router();

router.post('/login', authController.login_post);
router.get('/searching/:search',verifyJWT, authController.searching_get);
router.get('/logout',authController.logout_get);
router.post('/otp',verifyJWT,authController.otp_post);
router.post('/resend_otp',verifyJWT,authController.resend_post);
module.exports = router;

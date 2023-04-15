const { Router } = require('express');
const authController = require('../controllers/authController.js');
const verifyJWT = require('../middleware/verifyJWT.js');
const router = Router();

router.post('/login', authController.login_post);
// router.get('/',(req,res)=>{
//     res.send({title:"hello"});
// });

router.get('/searching/:search',verifyJWT, authController.searching_get);

module.exports = router;
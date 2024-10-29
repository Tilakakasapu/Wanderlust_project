const express = require('express');
const router = express.Router();

const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const user_cont = require('../controllers/users.js');


router.get('/signup', user_cont.rendersignup);


router.post('/signup',user_cont.signup);

router.get('/login',user_cont.renderlogin);

router.post('/login',saveRedirectUrl,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),user_cont.login)

router.get('/logout',user_cont.logout);

module.exports = router;
 

const express = require('express') ;
const { signUp, signIn, signOut, checkAuth } = require('../Controllers/auth.controller');
const router = express.Router() ;

router.post('/auth/signup',signUp) 
router.post('/auth/signin',signIn) 
router.post('/auth/signout',signOut) 
router.post('/auth/check-authentication',checkAuth) 




module.exports = router 
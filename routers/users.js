const express = require("express");


const router = express.Router();

const usersController = require("../controllers/users_controller");
const passport = require('passport');

// const postController = require('../controllers/post_controller');

router.get("/profile",passport.checkAuthentication, usersController.profile);
// router.get('/post', postController.post);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
// use  passport as a middle ware to authenticate it
router.post('/create-session',passport.authenticate(
'local', 
{ failuerRedirect: '/users/sign-in' },
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);

module.exports = router; 
  
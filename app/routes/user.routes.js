const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const verifySignUp  = require('../middleware/verifySignUp');
const { authJwt } = require("../middleware");

userRouter.post('/register', verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted,userController.signUp);
userRouter.post('/login', userController.signIn);

//Gmail Login
userRouter.post('/glogin', userController.GsignIn);

//login with refreshToken 
userRouter.post('/relogin', userController.reSignIn);

//Get all user details
userRouter.get('/', userController.getUsers)

//Get a alerts for a particular user
userRouter.get('/alerts', userController.getAlerts);

module.exports = userRouter;
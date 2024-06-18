const express =require('express')
const authRouter =express.Router()
const authController =require('../controllers/auth.controller')
const asyncHandler= require('express-async-handler')


authRouter.route('/register').post(asyncHandler(authController.register))
authRouter.route('/login').post(asyncHandler(authController.login))
authRouter.route('/verify-otp').post(asyncHandler(authController.verifyOTP));


module.exports=authRouter;
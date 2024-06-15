const express =require('express')
const userRouter =express.Router()
const asyncHandler=require('express-async-handler')
const userController=require('../controllers/user.controller')
const upload =require('../middlewares/upload')
const {validation} =require('../middlewares/validations/validation')
const userValidator =require('../middlewares/validations/user.validation')
userRouter.route('/')
.get(asyncHandler(userController.getAllUsers))
.post(validation(userValidator.addUserValidation),asyncHandler(userController.addNewUser))


userRouter.route('/:id')
.get(asyncHandler(userController.getSpecificUser))
.put(validation(userValidator.updateUserValidation),
asyncHandler(userController.updateUser))
.delete(asyncHandler(userController.deleteUser))


userRouter.route('/:id/upload-image')
.post(userController.checkIfUserExists,
    upload.single("image"),
    asyncHandler(userController.uploadProfileImage))


module.exports=userRouter

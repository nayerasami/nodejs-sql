const express = require('express');
const socialPlatformsRouter = express.Router()
const socialPlatformsController = require('../controllers/socialPlatforms.controller')
const asyncHandler = require('express-async-handler')
const { validation } = require('../middlewares/validations/validation')
const socialPlatformValidator = require('../middlewares/validations/socialPlatforms.validation')
socialPlatformsRouter.route('/')
    .get(asyncHandler(socialPlatformsController.getAllSocialMediaPlatforms))
    .post(validation(socialPlatformValidator.addSocialPlatformValidation),
        asyncHandler(socialPlatformsController.addNewSocialMediaPlatform))

socialPlatformsRouter.route('/:id')
    .get(asyncHandler(socialPlatformsController.getSpecificSocialMediaPlatforms))
    .put(validation(socialPlatformValidator.updateSocialPlatformValidation),
        asyncHandler(socialPlatformsController.updateSocialMediaPlatform))
    .delete(asyncHandler(socialPlatformsController.deleteSocialMediaPlatform))

module.exports = socialPlatformsRouter
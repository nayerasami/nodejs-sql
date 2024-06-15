const express = require('express');
const socialRouter = express.Router();
const asyncHandler = require('express-async-handler');
const socialController = require('../controllers/socialAccounts.controller')
const { validation } = require('../middlewares/validations/validation')
const socialValidator = require('../middlewares/validations/socialAccounnts.validation')

socialRouter.route('/')
    .get(asyncHandler(socialController.getAllSocials))
    .post(validation(socialValidator.addSocialAccountValidation), asyncHandler(socialController.addNewSocialAccount))



socialRouter.route('/:id')
    .get(asyncHandler(socialController.getSpecificSocialAccount))
    .put(validation(socialValidator.updateSocialAccountValidation), asyncHandler(socialController.updateSocialAccount))
    .delete(asyncHandler(socialController.deleteSocialAccount))


module.exports = socialRouter
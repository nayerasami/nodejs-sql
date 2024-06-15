const joi =require('joi')


module.exports.addSocialAccountValidation =joi.object().required().keys({
    userName:joi.string().min(2).max(30).required().trim(),
    socialLink:joi.string().required().trim(),
    userId:joi.number().integer().positive().required(),
    socialMediaPlatformsId:joi.number().integer().positive().required()

})

module.exports.updateSocialAccountValidation =joi.object().required().keys({
    id:joi.number().integer().required(),
    userName:joi.string().min(2).max(30).optional().trim(),
    socialLink:joi.string().optional().trim(),
    userId:joi.number().integer().positive().required(),
    socialMediaPlatformsId:joi.number().integer().positive().required()
})



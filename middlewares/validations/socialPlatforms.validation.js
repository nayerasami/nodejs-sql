const joi =require('joi')



module.exports.addSocialPlatformValidation =joi.object().required().keys({
    name:joi.string().min(2).max(30).required().trim(),
    icon:joi.string().required().trim(),

})

module.exports.updateSocialPlatformValidation =joi.object().required().keys({
    id:joi.number().integer().required(),
    name:joi.string().min(2).max(30).optional().trim(),
    icon:joi.string().optional().trim()
})

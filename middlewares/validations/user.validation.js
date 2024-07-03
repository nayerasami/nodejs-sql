const Joi = require('joi');
// const joiNumber = require('joi').extend(require('joi-phone-number'))



module.exports.addUserValidation = Joi.object().required().keys({
    firstName: Joi.string().required().min(2).max(20).trim(),
    lastName: Joi.string().required().min(2).max(20).trim(),
    email: Joi.string().email().required().trim(),
    phoneNumber:Joi.string().required().regex(/^\d{11}$/).messages({
        'string.pattern.base': 'Phone number must be exactly 11 digits',
    }).trim(),
    password: Joi.string().required().min(6).trim(),
    imageUrl: Joi.string().optional().trim(),
    gender: Joi.string().optional().trim(),
    birthDate: Joi.date().optional(),
    nationality: Joi.string().optional().trim(),
    bio: Joi.string().optional().min(2).max(250).trim(),
    fullNameArabic: Joi.string().optional().min(2).max(150).trim(),
    fullNameEnglish: Joi.string().optional().min(2).max(150).trim(),
    county: Joi.string().optional().min(2).max(30).trim(),
    city: Joi.string().optional().min(2).max(30).trim(),
    fullAddress: Joi.string().optional().min(2).max(150).trim()
});


module.exports.updateUserValidation = Joi.object().required().keys({
    id: Joi.number().integer().positive().required(),
    firstName: Joi.string().optional().min(2).max(20).trim(),
    lastName: Joi.string().optional().min(2).max(20).trim(),
    imageUrl: Joi.string().optional().trim(),
    gender: Joi.string().valid('male','female').required(),
    birthDate: Joi.date().allow(null, '').optional(),
    nationality: Joi.string().allow(null, '').optional().trim(),
    fullNameArabic: Joi.string().allow(null, '').optional().min(2).max(150).trim(),
    fullNameEnglish: Joi.string().allow(null, '').optional().min(2).max(150).trim(),
    country: Joi.string().allow(null, '').min(2).max(30).optional().trim(),
    city: Joi.string().allow(null, '').min(2).max(30).optional().trim(),
    fullAddress: Joi.string().allow(null, '').optional().min(2).max(150).trim(),
    bio: Joi.string().allow(null, '').optional().min(2).max(250).trim()
})

const Joi = require('joi');
const joiNumber = require('joi').extend(require('joi-phone-number'))



module.exports.addUserValidation = Joi.object().required().keys({
    firstName: Joi.string().required().min(2).max(20).trim(),
    lastName: Joi.string().required().min(2).max(20).trim(),
    email: Joi.string().email().required().trim(),
    phoneNumber: joiNumber.string().phoneNumber({
        defaultCountry: 'EG',
        allowedCountries: ['EG', 'SA'],
        format: 'e164',
        strict: true
    }).required().messages({
        'phoneNumber.base': 'Phone number must be a valid mobile phone number',
        'phoneNumber.format': 'Phone number must be in a valid format',
        'phoneNumber.country': 'Phone number must be a valid mobile phone number in the specified countries',
    }),
    password: Joi.string().required().min(6).trim(),
    imageUrl: Joi.string().optional().trim(),
    gender: Joi.string().valid('male', 'female').optional().trim(),
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
    email: Joi.string().email().messages({
        'string.email': 'Please enter a valid email address.'
    }).required().trim(),
    phoneNumber: joiNumber.string().phoneNumber({
        defaultCountry: 'EG',
        allowedCountries: ['EG', 'SA'],
        format: 'e164',
        strict: true
    }).required().messages({
        'phoneNumber.base': 'Phone number must be a valid mobile phone number',
        'phoneNumber.format': 'Phone number must be in a valid format',
        'phoneNumber.country': 'Phone number must be a valid mobile phone number in the specified countries',
    }),
    password: Joi.string().optional().min(6).trim(),
    imageUrl: Joi.string().optional().trim(),
    gender: Joi.string().valid('male', 'female').optional().trim(),
    birthDate: Joi.date().optional(),
    nationality: Joi.string().optional().trim(),
    bio: Joi.string().optional().min(2).max(250).trim(),
    fullNameArabic: Joi.string().optional().min(2).max(150).trim(),
    fullNameEnglish: Joi.string().optional().min(2).max(150).trim(),
    country: Joi.string().optional().min(2).max(30).trim(),
    city: Joi.string().optional().min(2).max(30).trim(),
    fullAddress: Joi.string().optional().min(2).max(150).trim()
})

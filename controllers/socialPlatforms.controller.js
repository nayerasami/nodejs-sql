const SocialMediaPlatforms = require('../models/socialMediaPlatforms.js');
const SocialMediaPlatformsServices = require('../services/socialPlatforms.services');
const ApiError = require("../utiles/ErrorClass.js")

module.exports.getAllSocialMediaPlatforms = async (req, res, next) => {
    const SocialMediaPlatforms = await SocialMediaPlatformsServices.getAllSocialMediaPlatformsService()
    res.status(200).json({ status: "success", data: { SocialMediaPlatforms } })
}

module.exports.getSpecificSocialMediaPlatforms = async (req, res, next) => {
    const { id } = req.params
    const SocialMediaPlatform = await SocialMediaPlatformsServices.getSpecificSocialMediaPlatformService(id)
    if (!SocialMediaPlatform) {
        return next(new ApiError('this social platform is not found', 404))
    }
    res.status(200).json({ status: "success", data: { SocialMediaPlatform } })
}


module.exports.addNewSocialMediaPlatform = async (req, res, next) => {
    const data = req.body;

    const oldSocialPlatformName = await SocialMediaPlatforms.findOne({ where: { name: data.name } })
    if (oldSocialPlatformName) {
        return next(new ApiError('this social platform name already exists', 400))
    }
    const oldSocialPlatformIcon = await SocialMediaPlatforms.findOne({ where: { name: data.icon } })
    if (oldSocialPlatformIcon) {
        return next(new ApiError('this social platform icon already exists', 400))
    }

    const newSocialMediaPlatform = await SocialMediaPlatformsServices.addNewSocialMediaPlatformService(data)
    res.status(201).json({ status: "success", data: { newSocialMediaPlatform } })
}

module.exports.updateSocialMediaPlatform = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;

    const [affectedRows] = await SocialMediaPlatformsServices.updateSocialMediaPlatformService(updatedData, id);

    if (affectedRows === 0) {
        return next(new ApiError('This social platform is not found', 404));
    }
    const updatedSocialMediaPlatform = await SocialMediaPlatformsServices.updateSocialMediaPlatformService(updatedData, id)
    res.status(200).json({ status: "success", data: { updatedSocialMediaPlatform } })
}


module.exports.deleteSocialMediaPlatform = async (req, res, next) => {
    const { id } = req.params;
    const deletedSocialMediaPlatform = await SocialMediaPlatformsServices.deleteSocialMediaPlatformService(id)
    if (!deletedSocialMediaPlatform) {
        return next(new ApiError('this social platform  is not found ', 404))
    }
    res.status(200).json({ status: "success", data: null })
}
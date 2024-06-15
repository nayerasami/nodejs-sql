const socialServices = require('../services/socialAccounts.services')
const ApiError = require("../utiles/ErrorClass.js");
const SocialMedia = require('../models/socialmedia.js');


module.exports.getAllSocials = async (req, res, next) => {
    const socialAccounts = await socialServices.getAllSocialMediaService();
    res.status(200).json({ status: "success", data: { socialAccounts } })
}

module.exports.getSpecificSocialAccount = async (req, res, next) => {
    const { id } = req.params;
    const socialAccount = await socialServices.getSpecificSocialMediaService(id)
    if (!socialAccount) {
        return next(new ApiError('this social account is not found', 404))
    }
    res.status(200).json({ status: "success", data: { socialAccount } })
}
module.exports.addNewSocialAccount = async (req, res, next) => {
    const data = req.body
    const oldSocialAccount = await SocialMedia.findOne({ where: { socialLink: data.socialLink } })
    if (oldSocialAccount) {
        return next(new ApiError('this social link already exist', 400))
    }

    const newAccount = await socialServices.addNewSocialMediaService(data)
    res.status(201).json({ status: "success", data: { newAccount } })
}

module.exports.updateSocialAccount = async (req, res, next) => {
    const updatedData = req.body;
    const { id } = req.params;
    const [affectedRows] = await socialServices.updateSocialMediaService(updatedData, id);

    if (affectedRows === 0) {
        return next(new ApiError('This social account is not found', 404));
    }
    const updatedAccount = await socialServices.updateSocialMediaService(updatedData, id);
    res.status(200).json({ status: "success", data: { updatedAccount } })

}

module.exports.deleteSocialAccount = async (req, res, next) => {
    const { id } = req.params;
    const deletedAccount = await socialServices.deleteSocialMediaService(id)
    if (!deletedAccount) {
        return next(new ApiError('this social account  is not found ', 404))
    }
    res.status(200).json({ status: "success", data: null })
}
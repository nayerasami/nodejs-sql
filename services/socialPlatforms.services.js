const SocialMediaPlatforms = require('../models/socialMediaPlatforms')

module.exports.getAllSocialMediaPlatformsService = async () => {
    return await SocialMediaPlatforms.findAll();
}

module.exports.getSpecificSocialMediaPlatformService = async (id) => {
    return await SocialMediaPlatforms.findByPk(id)
}

module.exports.addNewSocialMediaPlatformService = async (data) => {
    return await SocialMediaPlatforms.create(data)
}

module.exports.updateSocialMediaPlatformService = async (data, id) => {
    return await SocialMediaPlatforms.update(data, { where: { id } })
}

module.exports.deleteSocialMediaPlatformService = async (id) => {
    return await SocialMediaPlatforms.destroy({where:{id}})
}
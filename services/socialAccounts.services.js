const SocialMedia =require('../models/socialmedia')


module.exports.getAllSocialMediaService =async()=>{
    return await SocialMedia.findAll()
}

module.exports.getSpecificSocialMediaService  =async(id)=>{
    return await SocialMedia.findOne({ where: { socialMediaPlatformsId: id } });
}

module.exports.addNewSocialMediaService =async(data)=>{
    return await SocialMedia.create(data)
}

module.exports.updateSocialMediaService =async (data,id)=>{
    return await SocialMedia.update(data,{where:{id}})
}

module.exports.deleteSocialMediaService =async(id)=>{
    return await SocialMedia.destroy({ where: { socialMediaPlatformsId: id }})
}
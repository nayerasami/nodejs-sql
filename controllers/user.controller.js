const userServices = require('../services/user.services')
const ApiError = require("../utiles/ErrorClass.js")
const User = require('../models/users.js')
const cloudinary =require('../config/cloudinary.config')
const sharp =require('sharp')

module.exports.getAllUsers = async (req, res, next) => {
    const users = await userServices.getAllUsersServices()
    res.status(200).json({ status: "success", data: { users } })

}

module.exports.getSpecificUser = async (req, res, next) => {
    const { id } = req.params
    const user = await userServices.getSpecificUserServices(id)
    if (!user) {
        return next(new ApiError('this user is not found', 404))
    }
    res.status(200).json({ status: "success", data: { user } })
}



module.exports.addNewUser = async (req, res, next) => {
    const userData = req.body
    const oldUser = await User.findOne({ where: { email: userData.email } });
    if (oldUser) {
        return next(new ApiError('user already exists', 400))
    }

    const oldUserNumber = await User.findOne({ where: { phoneNumber: userData.phoneNumber } })
    if (oldUserNumber) {
        return next(new ApiError('phone number already in use', 404))
    }
    const newUser = await userServices.postAddNewUserServices(userData)
    res.status(201).json({ status: "success", data: { newUser } })
}

module.exports.updateUser = async (req, res, next) => {
    const updatedData = req.body;
    const { id } = req.params;
    const [affectedRows] = await userServices.updateUserServices(updatedData, id);

    if (affectedRows === 0) {
        return next(new ApiError('This user is not found', 404));
    }
    const updatedUser = await userServices.updateUserServices(updatedData, id)
    res.status(200).json({ status: "success", data: { updatedUser } })


}

module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await userServices.deleteUserServices(id)
    if (!deletedUser) {
        return next(new ApiError('this user is not found', 404))
    }
    res.status(200).json({ status: "success", data: null })
}

// module.exports.uploadProfileImage = async (req, res, next) => {
//     const { id } = req.params
//     const user = await userServices.getSpecificUserServices(id)
//     if (!user) {
//         return next(new ApiError('this user is not found', 404))
//     }
//     res.status(201).json({ message: "image uploaded successfully" })
// }

module.exports.uploadProfileImage = async (req, res, next) => {
    const { id } = req.params;
    const user = await userServices.getSpecificUserServices(id);
    
    if (!user) {
        return next(new ApiError('This user is not found', 404));
    }

    if (!req.file) {
        return next(new ApiError('No file uploaded', 400));
    }


    const resizedImage =await sharp(req.file.buffer)
    .resize(200,200)
    .jpeg({quality:80})
    .toBuffer()

    if (resizedImage.length > 10485760) {
        return next(new ApiError('Compressed image size is still too large', 400));
    }

    cloudinary.uploader.upload_stream(
        { folder: 'user-images' },
        async (error, result) => {
            if (error) {
                return next(error);
            }
            user.image = result.secure_url;
            await user.save();
            res.status(201).json({ message: "Image uploaded successfully", user });
        }
    ).end(resizedImage);
};





module.exports.checkIfUserExists = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userServices.getSpecificUserServices(id);
        if (!user) {
            return next(new ApiError('This user is not found', 404));
        }
        next();
    } catch (err) {
        next(err);
    }
};
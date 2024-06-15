const User = require('../models/users')

//get all users
module.exports.getAllUsersServices = async () => {
    return await User.findAll({
        attributes: { exclude: ['password'] }
    })
}

//get one user by id 

module.exports.getSpecificUserServices = async (id) => {
    return await User.findByPk(id)
}

//add user
module.exports.postAddNewUserServices = async (userData) => {
    return await User.create(userData)
}

//update user 

module.exports.updateUserServices = async (updatedData, id) => {
    return await User.update(updatedData, { where: { id } })
}


//delete user 

module.exports.deleteUserServices = async (id) => {
    return await User.destroy(id)
}


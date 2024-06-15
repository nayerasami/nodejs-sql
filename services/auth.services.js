const User =require('../models/users')


//register
module.exports.registerNewUserService = async({ firstName, lastName, email, phoneNumber, password })=>{
    return await User.create({ firstName, lastName, email, phoneNumber, password })

}


// //login
// module.exports.loginExistingUserService =async()=>{


// }


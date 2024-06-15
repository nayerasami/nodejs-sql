const authService = require('../services/auth.services')
const ApiError = require('../utiles/ErrorClass')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const { generateAccessToken } = require("../utiles/JWTtoken")

//register 

module.exports.register = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
        return next(new ApiError('user already exists', 400))
    }

    const oldUserNumber = await User.findOne({ where: { phoneNumber } })
    if (oldUserNumber) {
        return next(new ApiError('phone number already in use', 404))
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await authService.registerNewUserService({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword
    })

    const token = await generateAccessToken(
        {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
    )
    newUser.accessToken = token;

    res.status(201).json({ status: "success", data: { user: newUser } })
}

//login 

module.exports.login = async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError('email and password are required', 400))
    }

    const existedUser = await User.findOne({ where: { email } })
    const matchedPassword = await bcrypt.compare(password, existedUser.password)
    if (existedUser && matchedPassword) {
        const token = await generateAccessToken({
            id: existedUser.id,
            firstName: existedUser.firstName,
            lastName: existedUser.lastName,
            email: existedUser.email
        })
        res.status(200).json({ status: "success", data: { user: 'logged in successfully', accessToken: token } })
    } else if (!matchedPassword) {
        return next(new ApiError('incorrect password', 500))
    } else {
        return next(new ApiError('something went wrong', 500))
    }

}

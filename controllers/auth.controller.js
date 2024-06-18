const authService = require('../services/auth.services')
const ApiError = require('../utiles/ErrorClass')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const { generateAccessToken } = require("../utiles/JWTtoken")
const dotenv = require('dotenv')
dotenv.config()
const otps = new Map();
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.SEND_GRID_API_KEY
        }
    })
);



//register 

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
//sending emails

const sendOTPEmail = async (toEmail, userName) => {
    const otp = generateOTP();
    otps.set(toEmail, otp);
    const mailOptions = {
        from:process.env.SENDER_EMAIL,
        to: toEmail,
        subject: 'your verification otp',
        html: `<p>Hi ${userName}</p>
                    <p>Your verification OTP code is <strong>${otp}</strong></p>
                    <p>Please use the code to verify your login.</p>
                    <p>Thank you.</p>`
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('email sent' + info.response)
    } catch (Err) {
        console.log('err sending email' + Err)
    }

}

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
    // console.log(newUser.email,newUser.first)
    const token = await generateAccessToken(
        {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
    )
    newUser.accessToken = token;


    try {
        await sendOTPEmail(newUser.email, newUser.firstName);
    } catch (error) {
        return next(new ApiError('Failed to send OTP email', 500));
    }

    res.status(201).json({ status: "success", data: { user: newUser } })

}

//verify otp

module.exports.verifyOTP = async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return next(new ApiError('Email and OTP are required', 400));
    }
    const storedOtp = otps.get(email);
    if (storedOtp && storedOtp === otp) {
        otps.delete(email);  // Remove the OTP after successful verification
        res.status(200).json({ status: "success", message: "OTP verified successfully" });
    } else {
        return next(new ApiError('Invalid OTP', 400));
    }
};


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

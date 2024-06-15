const jwt = require('jsonwebtoken');
const ApiError = require('../../utiles/ErrorClass');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) {
        return next(new ApiError('This user is not authorized', 401));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new ApiError('Token not found', 401));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        return next(new ApiError('Invalid token', 401));
    }
};

module.exports = verifyToken;

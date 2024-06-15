const Sequelize = require('sequelize')

const sequelize = require('../config/dbConnection')
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,

    }, email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    }, 
    phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    gender: {
        type: Sequelize.ENUM('male,female'),
        allowNull: true
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: true
    }, 
    nationality: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bio: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    fullNameArabic: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    fullNameEnglish: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    county: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fullAddress: {
        type: Sequelize.STRING,
        allowNull: true
    },
    accessToken:{
        type:Sequelize.STRING,
    }
});



module.exports = User;

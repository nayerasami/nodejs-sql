const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../config/dbConnection')
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,

    }, email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    }, 
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male','female'),
        allowNull: true
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: true
    }, 
    nationality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fullNameArabic: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fullNameEnglish: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    county: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fullAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accessToken:{
        type:DataTypes.STRING,
    }
});



module.exports = User;

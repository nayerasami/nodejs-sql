const Sequelize = require('sequelize');
const sequelize = require('../config/dbConnection');
const User = require('./users');
const SocialMediaPlatforms = require('./socialMediaPlatforms');

const SocialMedia = sequelize.define('socialMedia', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    socialLink: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    socialMediaPlatformsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: SocialMediaPlatforms,
            key: 'id'
        }
    }
});

module.exports = SocialMedia;

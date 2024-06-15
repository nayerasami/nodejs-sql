const Sequelize = require('sequelize');
const sequelize = require('../config/dbConnection')

const SocialMediaPlatforms = sequelize.define('socialMediaPlatforms', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports=SocialMediaPlatforms;

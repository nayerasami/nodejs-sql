const Sequelize = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()
const sequelize = new Sequelize(
    process.env.DB, 
    process.env.DB_USER_NAME, 
    process.env.DB_PASSWORD,
    { dialect: 'mysql', host: 'localhost' }
)


module.exports = sequelize;
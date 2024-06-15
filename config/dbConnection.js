const Sequelize = require('sequelize')

const  sequelize= new Sequelize('qtech-node-task','root','nayera@@1122',
    {dialect:'mysql',host:'localhost'}
)


module.exports=sequelize;
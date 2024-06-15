 const cors = require('cors');
const sequelize = require('../config/dbConnection');
const { globalErrorHandling } = require("../utiles/globalErrorHandling.js");
const ApiError =require("../utiles/ErrorClass.js");
const userRouter = require('./user.routes.js');
const path =require('path');
const socialRouter = require('./socialAccounts.routes.js');
const socialPlatformsRouter = require('./socialPlatforms.routes.js');
const authRouter = require('./auth.route.js');
const verifyToken = require('../middlewares/auth/isAuthorized.js'); 

const bootstrap = (app, express) => {


    app.use(express.static(path.join(__dirname,'images')))

    app.use(express.json());
    const corsOptions = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    };
    app.use(cors(corsOptions));

    app.get('/', (req, res) => {
        res.send('OUR API V3');
    });

    // Routing set up
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/user',verifyToken,userRouter)
    app.use('/api/v1/social-accounts',verifyToken,socialRouter)
    app.use('/api/v1/social-platforms',verifyToken,socialPlatformsRouter)


    app.use("*", (req, res, next) => {
        next(new ApiError(`In-valid Routing: ${req.originalUrl}`, 400));
    });




    //global error handling
    app.use(globalErrorHandling)
    
    //db connection
    sequelize.sync({force: true})
    .then(() => {
        console.log('Database & tables created successfully...');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
}

module.exports = bootstrap;
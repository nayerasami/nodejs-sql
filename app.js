const express = require('express');
const dotenv = require('dotenv');
const bootstrap = require('./routes/index.route');

dotenv.config();

const app = express();
bootstrap(app, express);

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



process.on('unhandledRejection', (error) => {
    console.error(`unhandledRejection error ${error.name}, ${error.message} `);
    server.close(() => {
        console.error('Shutting Down ...');
        process.exit(1);
    })

})
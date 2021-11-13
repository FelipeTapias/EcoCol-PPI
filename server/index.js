const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config({ path: '../.env' });
//Errors middlewares
const handleErrors = require("./error/handleErrors");

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api', routes);

//Errors
app.use(handleErrors);

//Assign port
app.set('port', process.env.SERVER_PORT || 5001);

//Server
app.listen(app.get('port'), () => {
    console.log(`Running on port ${app.get('port')}!`);
});
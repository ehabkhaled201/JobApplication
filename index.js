require('dotenv').config();

const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');



const Database = require('./databases/db');



const app = express();

const port = process.env.PORT || 3000;


global.Promise = require('bluebird');


app.use(bodyParser.json());


app.use(cors());


require('./start/router')(app);

app.use( (error, req, res, next) => {
    
    const status = req.statusCode || 500;
    
    const message = error.message;
    
    const data = error.data;
    
    res.status(status).json({
        message,
        data
    });
});


app.listen(port, () => {
    Database.getInstance()
    console.log(`app run on port ${port}`);
}) 
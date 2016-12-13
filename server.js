'use strict';

var express = require("express");


var logger = require('morgan');

var routes = require('./routes/index');
    //users = require('./api/api1/users')


var app = express();

var bodyParser = require('body-parser');

//var config = require('./config/main');

var config = require('./config');


var diContainer = require('./dependencyInjection/diContainer');

//diContainer.register('dbName', 'example-db');
//diContainer.register('tokenSecret', 'SHHH!');
diContainer.register('dbConfig', config.dbConfig);
diContainer.factory('db', require('./db/oracle_database'));
//diContainer.factory('authService', require('./lib/authService'));
diContainer.factory('userDao', require('./dao/user_dao'));
diContainer.factory('userService', require('./service/user_service'));




// configure app to use bodyParser()
// this will let us get the data from a POST
//req.body object will contain key-value pairs, where the value can be a string or array (when extended is false)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var api1 = require('./api/api1/api1');

app.use('/api/v1', api1);

app.listen(config.server.port, function(){
    console.log("Server started on port 3000");
    }
);

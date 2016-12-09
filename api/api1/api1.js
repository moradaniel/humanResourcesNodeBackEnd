var express = require("express");
var api = express.Router();



//var app = express();
var users = require("./users");


// add users route to api
api.use('/users', users);


module.exports = api;
var express = require("express");
var apiRoutes = express.Router();



//var app = express();
var users = require("./users");


// add users route to api
apiRoutes.use('/users', users);


var diContainer = require('../../dependencyInjection/diContainer');

const authenticationService = diContainer.get("authenticationService");

//= ========================
// Auth Routes
//= ========================

const authRoutes = express.Router();

// Set auth routes as subgroup/middleware to apiRoutes
apiRoutes.use('/auth', authRoutes);

// Registration route
authRoutes.post('/register', authenticationService.register);

/*
// Login route
authRoutes.post('/login', requireLogin, AuthenticationController.login);

// Password reset request route (generate/send token)
authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);

// Password reset route (change password using token)
authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);
*/


module.exports = apiRoutes;
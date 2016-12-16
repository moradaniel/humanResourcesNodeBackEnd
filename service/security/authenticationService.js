
const setUserInfo = require('./helpers').setUserInfo;
const jwt = require('jsonwebtoken');


// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user,tokenSecretKey) {
    return jwt.sign(user, tokenSecretKey, {
        expiresIn: 10080 // in seconds
    });
}


module.exports = function(userService) {

    var authenticationService = {};

    authenticationService.register = function (req, res, next) {
        // Check for registration errors
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;

        // Return error if no email provided
        if (!email) {
            return res.status(422).send({error: 'You must enter an email address.'});
        }

        // Return error if full name not provided
        if (!firstName || !lastName) {
            return res.status(422).send({error: 'You must enter your full name.'});
        }

        // Return error if no password provided
        if (!password) {
            return res.status(422).send({error: 'You must enter a password.'});
        }

        /*
         User.findOne({ email }, (err, existingUser) => {
         if (err) { return next(err); }

         // If user is not unique, return error
         if (existingUser) {
         return res.status(422).send({ error: 'That email address is already in use.' });
         }

         // If email is unique and password was provided, create account
         const user = new User({
         email,
         password,
         profile: { firstName, lastName }
         });

         user.save((err, user) => {
         if (err) { return next(err); }

         // Subscribe member to Mailchimp list
         // mailchimp.subscribeToNewsletter(user.email);

         // Respond with JWT if user was created

         const userInfo = setUserInfo(user);

         res.status(201).json({
         token: `JWT ${generateToken(userInfo)}`,
         user: userInfo
         });
         });
         });*/


        var user = {
            id: 111,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: "member"
        }
        // Respond with JWT if user was created

        const userInfo = setUserInfo(user);

        var diContainer = require('../../dependencyInjection/diContainer');
        var tokenSecretKey = diContainer.get('tokenSecretKey');


        res.status(201).json({
            token: `JWT ${generateToken(userInfo,tokenSecretKey)}`,
            user: userInfo
        });

    };



    return authenticationService;
};




/*
//= =======================================
// Registration Route
//= =======================================
//module.exports = function(userDao) {
exports.register = function (req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.' });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }


    User.findOne({ email }, (err, existingUser) => {
            if (err) { return next(err); }

            // If user is not unique, return error
            if (existingUser) {
                return res.status(422).send({ error: 'That email address is already in use.' });
            }

            // If email is unique and password was provided, create account
            const user = new User({
                email,
                password,
                profile: { firstName, lastName }
            });

        user.save((err, user) => {
            if (err) { return next(err); }

            // Subscribe member to Mailchimp list
            // mailchimp.subscribeToNewsletter(user.email);

            // Respond with JWT if user was created

            const userInfo = setUserInfo(user);

        res.status(201).json({
            token: `JWT ${generateToken(userInfo)}`,
            user: userInfo
        });
    });
    });
};*/
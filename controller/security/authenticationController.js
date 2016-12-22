
const passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local');

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

        var tokenSecretKey = require('../../dependencyInjection/diContainer').get('tokenSecretKey');

        // Setting username field to email rather than username
        const localOptions = {
            usernameField: 'email'
        };

        // Setting up local login strategy
         const localLogin = new LocalStrategy(localOptions, (email, password, done) => {


             var userFilter =    {
                 name:email,
                 enabled:true
             };

             userService.findUsers(userFilter)
                 .then(function(results) {
                     if(!results || results.length!== 1){
                         return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
                     }
                     return results[0];
                 })
                 .then(function(user) {

                       return  userService.checkPassword(password, user)
                             .then( function(areHashEqual) {
                                 if (!areHashEqual) {
                                     return done(null, false, {error: 'Your login details could not be verified. Please try again.'});
                                 }

                                 return (user);
                             });
                     }
                 )

                 .then( function(user) {

                     return done(null, user);

                 })
                 .catch(function(err) {
                     // res.json(err);
                     return done(err);
                 });
         });

// Setting JWT strategy options
        const jwtOptions = {
            // Telling Passport to check authorization headers for JWT
            jwtFromRequest: ExtractJwt.fromAuthHeader(),
            // Telling Passport where to find the secret
            secretOrKey: tokenSecretKey

            // TO-DO: Add issuer and audience checks
        };

// Setting up JWT login strategy
        const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

            console.log("Hola");

            var userFilter =    {
                name:payload.email,
                enabled:true
            };

            userService.findUsers(userFilter)
                .then(function(results) {
                    if(!results || results.length!== 1){
                        done(null, false);
                    } else {
                        done(null, results[0]);
                    }
                })
                .catch(function(err) {
                    // res.json(err);
                    return done(err, false);
                });

            /*User.findById(payload._id, (err, user) => {
             if (err) { return done(err, false); }

             if (user) {
             done(null, user);
             } else {
             done(null, false);
             }
             });*/
        });

        passport.use(jwtLogin);
        passport.use(localLogin);



        var authenticationController = {};

        authenticationController.register = function (req, res, next) {
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

            //var tokenSecretKey = require('../../dependencyInjection/diContainer').get('tokenSecretKey');

            res.status(201).json({
                token: `JWT ${generateToken(userInfo,tokenSecretKey)}`,
                user: userInfo
            });

        };



        //= =======================================
        // Login Route
        //= =======================================
        authenticationController.login = function (req, res, next) {
            const userInfo = setUserInfo(req.user);

            res.status(200).json({
                token: `JWT ${generateToken(userInfo,tokenSecretKey)}`,
                user: userInfo
            });
        };

        authenticationController.requireAuth = function (req, res, next) {
            return passport.authenticate('jwt', { session: false })(req, res, next);
        };


        authenticationController.requireLogin = function (req, res, next) {
            return passport.authenticate('local', { session: false })(req, res, next);
        };


        return authenticationController;
    };

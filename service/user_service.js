
var bcrypt = require('bcrypt-nodejs');

module.exports = function(userDao) {

    var userService = {};

    userService.findUsers = function (userFilter) {
        return userDao.findUsers(userFilter);
    };

    userService.saveUser = function(user){
        var  SALT_FACTOR = 10;
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(SALT_FACTOR, function(err, salt){
                bcrypt.hash(user.password, salt, null, function(err, hash) {
                    if (err) {
                        console.log("hashing the password failed " + err);
                        reject(err);
                    }
                    else {
                        console.log("hash was successful.");
                        resolve(hash);
                    }
                })
            })
        })
        .then(function(hash){
            user.password = hash;
            return userDao.saveUser(user);
        });
    };

    userService.checkPassword = function(candidatePassword,user) {

        if(!candidatePassword || !user.password){
            throw new Error('checkPassword: Not valid arguments');
        }

        return new Promise(function(resolve, reject) {
            bcrypt.compare(candidatePassword, user.password, function (err, areHashEqual) {
                if (err) {
                    console.log("hashing comparison failed: " + err);
                    reject(err);
                }
                else {
                    resolve(areHashEqual);
                }

            });
        });
    };

    return userService;
};
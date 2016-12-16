/*


 Estrella Tindle
 Stan Remick
 Renda Cintron
 Alethea Cepeda
 Carter Almon
 Arletha Wilhoite
 Danna Crader
 Margot Eickhoff
 Elaina Hopewell
 Marlin Hoop
 */

var ROLE_ADMIN = {
    code:"ROLE_ADMIN",
    name:"Admin"
};

/*case ROLE_ADMIN: role = 4; break;
case ROLE_OWNER: role = 3; break;
case ROLE_CLIENT: role = 2; break;
case ROLE_MEMBER: role = 1; break;
*/

var user_EstrellaTindle = {
        name: "estrellaTindle",
        roles:[
            ROLE_ADMIN
        ]
};
var users = [user_EstrellaTindle];


var User = require('../../model/user');


module.exports = (db) => {
    return {
        clean: () => {
            db.clean();
        },
        populate: () => {
            users.forEach(function(user){
                db.saveUser(new User(user))

            })
        }
    };
}
/*
module.exports = function(db) {

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

    userService.checkPassword = function(guess,user) {

        return new Promise(function(resolve, reject) {
            bcrypt.compare(guess, user.password, function (err, areHashEqual) {
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
};*/
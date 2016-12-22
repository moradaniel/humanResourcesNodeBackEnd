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


var user_DanielMora = {
    name: "moradaniel@gmail.com"
    ,email: "moradaniel@gmail.com"
    ,password:"password123"
    ,enabled: true
    ,roles:[
        ROLE_ADMIN
    ]
};

var user_EstrellaTindle = {
        name: "estrellatindle@test.com"
        ,email: "estrellatindle@test.com"
        ,password:"password1234"
        ,enabled: true
        ,roles:[
            ROLE_ADMIN
        ]
};


var users = [
                user_EstrellaTindle
                ,user_DanielMora
            ];


var User = require('../../model/user');


module.exports = (db, userService) => {
    return {
        clean: () => {
            db.clean();
        },
        populate: () => {
                var iterations = [];

                users.forEach(function(user){
                    iterations.push(userService.saveUser(new User(user)));
                });

                return Promise.all(iterations).then(function(savedUsers) {
                    return savedUsers;
                });
        }
    };
}

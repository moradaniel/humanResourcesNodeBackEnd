

var _ = require('lodash');

module.exports = function() {

    var inMemoryDB = {};

    var nextUserkey=0;

    inMemoryDB.init = () =>{
        inMemoryDB = {};
        inMemoryDB.usersMap = {};
        inMemoryDB.rolesMap = {};
    };

    inMemoryDB.clean = function () {
        inMemoryDB.init();
    };

    inMemoryDB.findUsers = function (userfilter){

        //get valueas from usersMap
        var usersArray = _.map(inMemoryDB.usersMap, function(value){
            return value;
        });

        return Promise.resolve(usersArray);
    };

    inMemoryDB.saveUser = function (user){
        nextUserkey++;
        user.id = nextUserkey;
        inMemoryDB.usersMap[nextUserkey]=user;
        return Promise.resolve(user);
    };


    return inMemoryDB;
};

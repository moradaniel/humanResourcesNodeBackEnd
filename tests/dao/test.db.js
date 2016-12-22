

var _ = require('lodash');


module.exports = function() {

    var inMemoryDB = {};

    var nextUserkey=0;

    inMemoryDB.init = () =>{
        nextUserkey=0;
        inMemoryDB.usersMap = {};
        inMemoryDB.rolesMap = {};
    };

    inMemoryDB.clean = function () {
        this.init();
    };

    inMemoryDB.findUsers = function (userFilter){

        //get values from usersMap
        var usersArray = _.map(inMemoryDB.usersMap, function(value){
            return value;
        });

        var foundUsers = usersArray;
        if(userFilter) {
            foundUsers = _.filter(usersArray,
                function (value) {
                    //var found = true;
                    if(userFilter.name && userFilter.name !== value.name){
                        return false;
                    }
                    if(userFilter.enabled && userFilter.enabled !== value.enabled){
                        return false;
                    }

                    return true;
                });
        }

        return Promise.resolve(foundUsers);
    };

    inMemoryDB.saveUser = function (user){
        nextUserkey++;
        user.id = nextUserkey;
        inMemoryDB.usersMap[nextUserkey]=user;
        return Promise.resolve(user);
    };


    return inMemoryDB;
};

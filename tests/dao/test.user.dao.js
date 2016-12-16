'use strict';

var User = require('../../model/user');


module.exports = function(db) {

    var userDao = {};

    userDao.findUsers = function(userFilter) {

        return new Promise(function (resolve, reject) {
            resolve(db.findUsers(userFilter));
        });

    }

    /*
     * save and return the saved user
     * */

    userDao.saveUser = function(user) {

        return new Promise(function (resolve, reject) {
            resolve(db.saveUser(user));
        });
    };

    return userDao;
};
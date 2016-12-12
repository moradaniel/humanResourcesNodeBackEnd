'use strict';

var User = require('./../model/user');

function buildQueryParameters(userFilter){

    var queryParameters={
        where:'',
        bindVars:{}
    };

    if(userFilter.enabled){
        queryParameters.where += " AND enabled = :enabled";
        if(userFilter.enabled===true){
            queryParameters.bindVars.enabled = 1;
        }else{
            queryParameters.bindVars.enabled = 0;
        }
    }
    if(userFilter.id){
        queryParameters.where += " AND id = :userId";
        queryParameters.bindVars.userId = userFilter.id;
    }

    return queryParameters;

}


module.exports = function(db) {

    var oracledb = require('oracledb');

    var userDao = {};

    userDao.findUsers = function(userFilter, next) {

        var queryParameters = buildQueryParameters(userFilter);

        var sql = " SELECT id as ID, name as NAME " +
            " FROM sec_account " +
            " WHERE 1=1 "+queryParameters.where;


        return new Promise(function (resolve, reject) {
            db.simpleExecute(
                sql,
                queryParameters.bindVars,
                {
                    outFormat: oracledb.OBJECT
                }
            )
                .then(function (result) {

                    var users = [];
                    if (result.rows !== undefined && result.rows.length > 0) {

                        result.rows.forEach(function (value) {
                            var user = new User(value.ID, value.NAME);
                            users.push(user);
                            //console.log(value);
                        });
                    }

                    resolve(users);
                })
                .catch(function (err) {
                    reject(err);
                    next(err);
                });
        });
    }

    return userDao;
};
/*var users = {
 1: {
 name: 'Facundo', age: 1
 },
 2: {
 name: 'Julieta', age: 3
 },
 3: {
 name: 'Sofia', age: 4
 }
 };*/

var User = require('./../model/user');

var users2 = {

        1: {

            id: 1,
            name: "Luke Skywalker (Guille2)",
            url: "http://swapi.co/api/people/1/",
            height: "172",
            weight: "77"
        },
        2: {

            id: 2,
            name: "C-3PO",
            url: "http://swapi.co/api/people/2/",
            height: "167",
            weight: "75"
        }
    }
    ;


//var users3 = {};


var oracledb = require('oracledb');

var database = require('../db/oracle_database');

//oracledb.outFormat = oracledb.OBJECT;

/*
var usersDAO = function () {

    this.findUsers = function (usersFilter) {


        oracledb.getConnection(
            dbConfig,
            function (err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }

                connection.execute(
                    " SELECT id as ID, name as NAME " +
                    " FROM sec_account " +
                    " WHERE enabled=1",
                    //"WHERE manager_id < :id",
                    // [110],  // bind value for :id

                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        //console.log(result.rows);
                        if (result.rows !== undefined && result.rows.length > 0) {

                            result.rows.forEach(function (value) {
                                var user = new User(value.ID, value.NAME);
                                users[value.ID] = user;
                                console.log(value);
                            });
                        }


                    });
            });

    }

};*/


function findUsers(userFilter, next) {

    var queryParameters = buildQueryParameters(userFilter);

    var sql = " SELECT id as ID, name as NAME " +
        " FROM sec_account " +
        " WHERE 1=1 "+queryParameters.where;


    return new Promise(function (resolve, reject) {
        database.simpleExecute(
            sql,
            queryParameters.bindVars,
            {
                outFormat: oracledb.OBJECT
            }
        )
            .then(function (result) {

                var users = {};
                if (result.rows !== undefined && result.rows.length > 0) {

                    result.rows.forEach(function (value) {
                        var user = new User(value.ID, value.NAME);
                        users[value.ID] = user;
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


module.exports.findUsers = findUsers;

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

/*function buildBindVars(userFilter){

    var bindVars ={};
    if(userFilter.enabled){
        if(userFilter.enabled===true){
            bindVars.enabled = 1;
        }else{
            bindVars.enabled = 0;
        }
    }
    if(userFilter.id){
        bindVars.userId = userFilter.id;
    }

    return bindVars;

}*/
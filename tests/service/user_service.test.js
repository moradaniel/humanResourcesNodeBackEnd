'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
//var UserService = require('../../service/user_service');

var User = require('../../model/user');

var config = require('../../config');


var diContainer = config.diContainer;


var db = diContainer.get('db');
var userService = diContainer.get('userService');

const testDBPopulator = require('../dao/test.db.manager.js')(db, userService);


describe('UserService', function() {

   /* before((done) => { //Before each test we empty the database
    testDBPopulator.clean();
    testDBPopulator.populate()
    .then(function(savedUsers){
    done();
    }
    );
    });*/

    beforeEach((done) => { //Before each test we empty the database
        testDBPopulator.clean();
        testDBPopulator.populate()
            .then(function(savedUsers){
                done();
                }
            );

    });

    it('#findUsers', function () {

        var userFilter =    {
            //id:381,
            enabled:true
        };

        return userService.findUsers(userFilter)
            .then(function(results) {

                //sort both arrays before comparing
                //expect(_.sortBy(results, 'id')).to.eql(_.sortBy(buildArrayOfUsers(usersJsonArray), 'id'));
                expect(results).to.be.instanceof(Array);
                expect(results.length).to.eql(2);

            });
            /*.catch(function(err) {

                next(err);
            });*/


    });

    it('#saveUser', function () {

        var userFilter =    {
            //id:381,
            enabled:true
        };

        var testPassword = "password123";
        var theUser = {id:null,name:"TestUser",password:testPassword};
        var userToBeSaved = new User(theUser);

        return userService.saveUser(userToBeSaved)
            .then(function(savedUser) {
                console.log(JSON.stringify(savedUser, null, 2));
                return savedUser;
            })
            .then( function(user){
                return userService.checkPassword(testPassword, user)
                    .then(function(areHashEqual){
                        expect(areHashEqual).to.be.true;
                    }
                );

            });/*
        .catch(function(err) {
            console.log( err);
         });*/


    });
});
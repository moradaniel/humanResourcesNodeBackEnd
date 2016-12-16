'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
//var UserService = require('../../service/user_service');

var User = require('../../model/user');

var config = require('../../config');


var diContainer = config.diContainer;


/*var users = [
    {id: 1,name:"John"},
    {id: 2,name:"Foos"}];

var users2 = [
    {id: 3,name:"John2"},
    {id: 4,name:"Foos2"}];*/

var usersJsonArray = [{"id":5,"name":"adiazcano"},{"id":15,"name":"lromarion"},{"id":18,"name":"rjuarez"},{"id":42,"name":"epeletier"},{"id":43,"name":"gepelliza"},{"id":44,"name":"sguerra"},{"id":45,"name":"rcorrea"},{"id":46,"name":"galvarez"},{"id":62,"name":"rorelo"},{"id":74,"name":"pjavier"},{"id":77,"name":"wescudero"},{"id":106,"name":"obalverdi"},{"id":107,"name":"elizondopj"},{"id":119,"name":"mbustos"},{"id":142,"name":"gtellosup"},{"id":159,"name":"gtelloresponsable"},{"id":161,"name":"gtellorh"},{"id":179,"name":"gmeni"},{"id":181,"name":"rcastillo"},{"id":182,"name":"tzavaleta"},{"id":184,"name":"mflores"},{"id":186,"name":"fvelasco"},{"id":199,"name":"cmartinezsup"},{"id":219,"name":"rpesquera"},{"id":220,"name":"cmartinezrh"},{"id":239,"name":"vgomez"},{"id":259,"name":"monicamartinez"},{"id":260,"name":"mariojcastro"},{"id":261,"name":"ssoria"},{"id":262,"name":"izeballos"},{"id":263,"name":"jmontenegro"},{"id":264,"name":"avalor"},{"id":265,"name":"mzarate"},{"id":266,"name":"agutierrez"},{"id":279,"name":"jpaezz"},{"id":299,"name":"nmercado"},{"id":300,"name":"mtrivani"},{"id":301,"name":"mpfabregas"},{"id":302,"name":"antoniomartinez"},{"id":303,"name":"agalante"},{"id":305,"name":"fgimenez"},{"id":306,"name":"mlozano"},{"id":307,"name":"ralaniz"},{"id":308,"name":"gesquivel"},{"id":309,"name":"fpaez"},{"id":310,"name":"talaniz"},{"id":311,"name":"hsanchez"},{"id":312,"name":"amortiz"},{"id":321,"name":"preglado"},{"id":323,"name":"oaduarte"},{"id":324,"name":"nplahora"},{"id":325,"name":"lduarte"},{"id":326,"name":"soriadoraangelica"},{"id":327,"name":"maldonadojorgenicolas"},{"id":328,"name":"ororogeliojose"},{"id":339,"name":"anollen"},{"id":379,"name":"leandrogonzalez"},{"id":380,"name":"jrgodoy"},{"id":381,"name":"emortiz"},{"id":382,"name":"aemorales"},{"id":383,"name":"slavina"},{"id":386,"name":"sandravperez"},{"id":387,"name":"hvaldebenites"},{"id":388,"name":"mefredes"},{"id":399,"name":"mmvalverde"},{"id":419,"name":"esassul"},{"id":441,"name":"guillermoruizalvarez"},{"id":442,"name":"jquijano"},{"id":444,"name":"jpquattropani"},{"id":445,"name":"rarchilla"},{"id":446,"name":"mfernandez"},{"id":447,"name":"rherrera"},{"id":448,"name":"avillegas"},{"id":458,"name":"cmartinezresponsable"},{"id":459,"name":"cmartinezmin"},{"id":479,"name":"gdesanctis"},{"id":519,"name":"mhollger"},{"id":559,"name":"marancibia"},{"id":561,"name":"joseluissanchez"},{"id":619,"name":"rteragni"},{"id":661,"name":"sec.walter.lima"},{"id":662,"name":"tdelbono"},{"id":664,"name":"drtello.ambiente"},{"id":665,"name":"jose.strada"},{"id":822,"name":"vmerlano"},{"id":823,"name":"lariza"},{"id":982,"name":"rgattoni"},{"id":985,"name":"minrgattoni"},{"id":986,"name":"suparupcic"},{"id":987,"name":"vvictoria"},{"id":988,"name":"ebianchi"},{"id":989,"name":"mlopez"},{"id":991,"name":"mincgrynzpan"},{"id":992,"name":"paolarojas"},{"id":994,"name":"jlespinoza"},{"id":995,"name":"dratta"},{"id":996,"name":"mabelsoria"},{"id":997,"name":"mialcarrizo"},{"id":1009,"name":"lbufano"},{"id":1010,"name":"gcasais"}];

/*function buildArrayOfUsers(usersJson){
    var usersArray = [];
    usersJson.forEach(function (value) {
        var user = new User(value.id, value.name);
        usersArray.push(user);
    });

    return usersArray;
}*/

/*
function fakeUserDao (db) {

    var usersMap = {};

    //build the map of users
    usersJsonArray.forEach(function (value) {
        var user = new User(value.id, value.name);
        usersMap[user.id]=user;
    });

    //build the map of users
    //var usersMap =  _.keyBy(usersJsonArray, 'id');


   // var userFilter =    {
   //     //id:381,
   //     enabled:true
   // };

    var userDao = {};

    userDao.findUsers = function(userFilter, next) {

        //get valueas from usersMap
        var usersArray = _.map(usersMap, function(value){
            return value;
            });

        return Promise.resolve(usersArray);
    }

    //
    // save and return the saved user
    //

    userDao.saveUser = function(user) {

        return new Promise(function (resolve, reject) {
            usersMap[user.id] = user;
            resolve(user);
        });
    };

    return userDao;
};*/

//diContainer.factory('userDao', fakeUserDao);
//diContainer.factory('userDao', require('../../dao/user_dao'));

var userService = diContainer.get('userService');


describe('UserService', function() {
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
                expect(results.length).to.eql(1);

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
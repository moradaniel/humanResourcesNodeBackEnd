
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

chai.use(require('chai-string'));

const apiBaseUrl = '/api/v1';

var config = require('../../../config/index');

var db = config.diContainer.get('db');
var userService = config.diContainer.get('userService');

const testDBPopulator = require('../../dao/test.db.manager.js')(db, userService);

const server = require('../../../server');

//Our parent block
describe('Authentication REST API', () => {

    var token;

    var userCredentials = {
        "email":"moradaniel@gmail.com",
        "password":"password123"
    };

    before((done) => { //Before all tests

        testDBPopulator.clean();
        testDBPopulator.populate()
            .then(function(savedUsers){

                chai.request(server)
                    .post(apiBaseUrl+'/auth/login')
                    .send(userCredentials)
                    .end(function(err, res) {
                        token = res.body.token; // Or something
                        done();
                    });

                }
            );


        //done();
    });

    beforeEach((done) => { //Before each test we empty the database
        //Book.remove({}, (err) => {
        //    done();
        //});
        testDBPopulator.clean();
        testDBPopulator.populate();
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET user', () => {


        /*
        beforeEach((done) => { //Before each test we empty the database
            testDBPopulator.clean();
            testDBPopulator.populate();
            done();
        });*/

        it('it should GET all the users', (done) => {
            chai.request(server)
                .get(apiBaseUrl+'/users')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.a('array');
                    res.body.results.length.should.be.eql(2);
                    done();
                });
        });
    });



});
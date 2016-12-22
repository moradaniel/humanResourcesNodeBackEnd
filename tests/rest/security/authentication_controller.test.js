//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

chai.use(require('chai-string'));

const apiBaseUrl = '/api/v1';

var config = require('../../../config');

var db = config.diContainer.get('db');
var userService = config.diContainer.get('userService');

const testDBPopulator = require('../../dao/test.db.manager.js')(db, userService);

const server = require('../../../server');

//Our parent block
describe('Authentication REST API', () => {
    before((done) => { //Before all tests
        done();
    });

    beforeEach((done) => { //Before each test we empty the database
        //Book.remove({}, (err) => {
        //    done();
        //});
        testDBPopulator.clean();
        testDBPopulator.populate()
            .then(function(savedUsers){
                    done();
                }
            );
    });


    /*
     * Test the /POST registration
     */
    describe('/POST registration', () => {
        /*beforeEach((done) => { //Before each test we empty the database
            testDBPopulator.clean();
            testDBPopulator.populate();
            done();
        });*/
        it('it should register a user and get a JWT token', (done) => {
            let registration = {
                "email":"moradaniel@gmail.com",
                "firstName":"daniel",
                "lastName":"mora",
                "password":"password123"
            };
            chai.request(server)
                .post(apiBaseUrl+'/auth/register')
                .send(registration)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.token.should.be.a('string');
                    res.body.token.should.startsWith('JWT ')
                    //res.body.should.be.a('object');
                    //res.body.should.have.property('token');
                    res.body.should.have.property('user');

                   // res.body.errors.should.have.property('pages');
                   // res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

    });



    /*
     * Test the /POST login
     */
    describe('/POST login', () => {
        /*beforeEach((done) => { //Before each test we empty the database
         testDBPopulator.clean();
         testDBPopulator.populate();
         done();
         });*/
        it('it should login a user and get a JWT token', (done) => {
            let loginInfo = {
                "email":"moradaniel@gmail.com",
                "password":"password123"
            };
            chai.request(server)
                .post(apiBaseUrl+'/auth/login')
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.token.should.be.a('string');
                    res.body.token.should.startsWith('JWT ')
                    //res.body.should.be.a('object');
                    //res.body.should.have.property('token');
                    res.body.should.have.property('user');

                    done();
                });
        });

    });

});
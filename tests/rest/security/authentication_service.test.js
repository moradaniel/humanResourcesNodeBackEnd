//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const apiBaseUrl = '/api/v1';

var config = require('../../../config');

var db = config.diContainer.get('db');

const testDBPopulator = require('../../dao/test.db.manager.js')(db);

const server = require('../../../server');

//Our parent block
describe('Authentication REST API', () => {
    before((done) => { //Before all tests
        done();
    });

    beforeEach((done) => { //Before each test we empty the database
        /*Book.remove({}, (err) => {
            done();
        });*/
        testDBPopulator.clean();
        testDBPopulator.populate();
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET user', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get(apiBaseUrl+'/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.a('array');
                    res.body.results.length.should.be.eql(1);
                    done();
                });
        });
    });

});
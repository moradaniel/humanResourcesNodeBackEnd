'use strict';

//var assert = require('assert');

var expect = require('chai').expect;
var add    = require('../add.js');

describe('add()', function() {

    /**
     * optional preparation for each test
     */
    beforeEach(function(){
        console.log("started");
    });

    /**
     * optional cleanup after each test
     */
    afterEach(function(){
        console.log("completed");
    });

    it('should return 2 when you pass it 1, 1', function() {
        //assert.equal(add(1, 1), 2);

        expect(add(1, 1)).to.be.equal(2);

        //done();
    });

    it('should return 3 when you pass it 1, 2', function() {
        //assert.equal(add(1, 1), 2);

        expect(add(1, 2)).to.be.equal(3);

        //done();
    });
});
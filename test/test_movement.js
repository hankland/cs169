/* Test character movement in our basic game overworld. */

var assert = require("assert");
var should = require("should");
var request = require("supertest");

var app = require("express");
User = require('../models').User;
Character = require('../models').Character;

/* TEST MOVEMENT */
describe.skip('move()', function(){
  it('should update the character position for valid locations', function(){
    // should.equal(Character.SUCCESS, res.err);
  })
  it('should not change coordinates for invalid locations', function(){
    // should.equal(Character.SUCCESS, res.err);
  })
})

/* SKIP THESE TESTS */

describe.skip('Character', function(){
  describe('#move()', function(){
    it('should DO SOMETHING', function(){
      // add here
    })
  })
})



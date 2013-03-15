/* Test the login/registration system. */

var assert = require("assert");
var should = require("should");
var request = require("supertest");

var app = require("express");
User = require('../models').User;
Character = require('../models').Character;
var register = require('../routes/register');

/* TEST REGISTRATION */
describe('register()', function(){
  it('should add a new User if no existing User has the same name', function(){
    // should.equal(User.SUCCESS, res.err);
  })
  it('should not add a new User with the same name as an existing User', function(){
    // should.equal(User.EXISTS_ERROR, res.err);
  })
  it('should not allow username/password lengths < 1 or > 16', function(done){
    // should.equal(User.BAD_USER_ERROR, res.err);
  })
})

/* TEST LOGGING IN */
describe.skip('login()', function(){
  it('should set the session data upon success', function(){
    // should.equal(User.SUCCESS, res.err);
  })
  it('should return error for non-existant users', function(){
    // should.equal(User.NOT_EXISTS_ERROR, res.err);
  })
  it('should return error for incorrect passwords', function(){
    // should.equal(User.BAD_PASSWORD_ERROR, res.err);
  })
})

/* TEST LOGGING OUT */
describe.skip('logout()', function(){
  it('should clear session data', function(){
    // should.equal(User.SUCCESS, res.err);
  })
})

/* SKIP THESE TESTS */

describe.skip('User', function(){
  describe('#register()', function(){
    it('should DO SOMETHING', function(){
      // add here
    })
  })
})

describe.skip('User', function(){
  describe('#login()', function(){
    it('should DO SOMETHING', function(){
      // add here
    })
  })
})

describe.skip('User', function(){
  describe('#logout()', function(){
    it('should DO SOMETHING', function(){
      // add here
    })
  })
})


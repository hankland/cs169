/* Test the login/registration system. */

var assert = require("assert");
var should = require("should");

var app = require("express");
User = require('../models').User;
Character = require('../models').Character;

/* TEST REGISTRATION */
describe('register()', function(){
  it('should add a new User if no existing User has the same name', function(){
    
  })
  it('should not add a new User with the same name as an existing User', function(){
    
  })
  it('should set the new User fields appropriately', function(){
    
  })
  it('should not allow username/password lengths < 1 or > 16', function(){
    
  })
})

/* TEST LOGGING IN */
describe('login()', function(){
  it('should set the session data upon success', function(){
    
  })
  it('should return error for non-existant users', function(){
    
  })
  it('should return error for incorrect passwords', function(){
    
  })
})

/* TEST LOGGING OUT */
describe('logout()', function(){
  it('should clear session data', function(){
    
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


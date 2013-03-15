/* Test character creation and selection. */

var assert = require("assert");
var should = require("should");

var app = require("express");
User = require('../models').User;
Character = require('../models').Character;

/* TEST CREATING A CHARACTER */
describe('createCharacter()', function(){
  it('should add a new Character if no existing Character has the same name', function(){
    
  })
  it('should not add a new Character with the same name as an existing Character', function(){
    
  })
  it('should set the new Character fields appropriately', function(){
    
  })
  it('should not allow character name lengths < 1 or > 16', function(){
    
  })
})

/* TEST SELECTING A CHARACTER */
describe('selectCharacter()', function(){
  it('should update the session data upon success', function(){
    
  })
  it('should return error if no character was selected', function(){
    
  })
})

/* SKIP THESE TESTS */

describe.skip('Character', function(){
  describe('#createCharacter()', function(){
    it('should DO SOMETHING', function(){
      // add here
    })
  })
})

describe.skip('Character', function(){
  describe('#selectCharacter()', function(){
    it('should DO SOMETHING', function(){
      // add here
    })
  })
})


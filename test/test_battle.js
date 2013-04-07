/* Test the battle system. */

/* Test-related tools. */
var assert = require('assert');
var should = require('should');
var request = require('supertest');

/* Our server. */
var app = require('../app');

/* Our routes. */
var register = require('../routes/register');

/* Our models. */
User = require('../models').User;
Character = require('../models').Character;

/* TEST BATTLE */
describe('enter_battle()', function() {
  it('should enter the battle', function(done) {
    // do something
    done();
  })
})

describe('end_battle()', function() {
  it('should exit the battle', function(done) {
    // do something
    done();
  })
})

describe('attack()', function() {
  it('should damage the target', function(done) {
    // do something
    done();
  })
})


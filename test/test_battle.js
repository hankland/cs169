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
describe.skip('enter_battle()', function() {
  it('should enter the battle', function(done) {
    // do something
    done();
  })
})

describe.skip('end_battle()', function() {
  it('should exit the battle', function(done) {
    // do something
    done();
  })
})

describe.skip('attack()', function() {
  it('should damage the target', function(done) {
    // do something
    done();
  })
})


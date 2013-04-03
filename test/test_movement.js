/* Test character movement in our basic game overworld. */

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

/* TEST MOVEMENT */
describe('move()', function() {
  it('should update the character position for valid locations', function() {
    // should.equal(Character.SUCCESS, res.err);
  })
  it('should not change coordinates for invalid locations', function() {
    // should.equal(Character.SUCCESS, res.err);
  })
})

/* TEST EQUIPMENT */
describe.skip('equip()', function() {
  it('should equip the item', function() {
    // do something
  })
})

/* TEST UNEQUIPMENT */
describe.skip('unequip()', function() {
  it('should unequip the item', function() {
    // do something
  })
})

/* TEST INTERACTION WITH NPCS */
describe.skip('talk_to_npc()', function() {
  it('should talk to the NPC', function() {
    // do something
  })
})

/* Test our basic game overworld. */

/* Test-related tools. */
var assert = require('assert');
var should = require('should');
var request = require('supertest');

/* Our server. */
var app = require('../app');

/* Our models. */
User = require('../models').User;
Character = require('../models').Character;

/* TEST EQUIPMENT */
describe.skip('equip()', function() {
  it('should equip the item', function(done) {
    // check that the item is in the character's equippedItems list
    done();
  })
})

/* TEST UNEQUIPMENT */
describe.skip('unequip()', function() {
  it('should unequip the item', function(done) {
    // check that the item is no longer in the character's equippedItems list
    done();
  })
})

/* TEST INTERACTION WITH NPCS */
describe.skip('talk_to_npc()', function() {
  it('should talk to the NPC', function(done) {
    // make sure that the dialog box successfully appears
    done();
  })
})

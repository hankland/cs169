/* Test our basic game overworld. */

var lib_path = process.env['LIB_COV'] ? '../lib-cov' : '../lib';
//lib_path = '..';

/* Test-related tools. */
var assert = require('assert');
var should = require('should');
var request = require('supertest');
// var io = require('socket.io');

/* Socket.IO testing setup. */
// var socketURL = 'http://localhost:3000';
// var options = {
//   transports: ['websocket'],
//   'force new connection': true
// };


/* Our server. */
var app = require(lib_path + '/app');

/* Our models. */
User = require(lib_path + '/models').User;
Character = require(lib_path + '/models').Character;

var Cookies;

/* TEST OVERWORLD */
describe('TEST_BATTLE', function() {
  before(function(done) {
    User.drop();
    Character.drop();
    Monster.drop();
    User.sync();
    Character.sync();
    Monster.sync();
    
    // add fake user with fake characters
    request(app)
      .post('/register')
      .send({ user: "Bob", password: "b" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        assert.equal(0, res.body.err);
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        var req = request(app).post('/create_character');
        req.cookies = Cookies;
        req
          .send({ name: "Dog" })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.equal(1, res.body.cid);
            assert.equal(0, res.body.err);
            var req2 = request(app).post('/create_character');
            req2.cookies = Cookies;
            req2
              .send({ name: "Cat" })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {
                assert.equal(2, res.body.cid);
                assert.equal(0, res.body.err);
                done();
              });
          });
      });
  })

  /* TEST ENTERING OVERWORLD. */
  describe('/play', function() {
    it('should enter the game overworld', function(done) {
      var req = request(app).get('/play');
      req.cookies = Cookies;
      req
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          done();
        });
    })
  })

  /* TEST EQUIPMENT. */
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

  after(function(done) {
    User.drop();
    Character.drop();
    User.sync();
    Character.sync();
    done();
  })
})

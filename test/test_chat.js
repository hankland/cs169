/* Test our basic game overworld. */

var lib_path = process.env['LIB_COV'] ? '../lib-cov' : '../lib';
//lib_path = '..';

/* Test-related tools. */
var assert = require('assert');
var should = require('should');
var request = require('supertest');
var io = require('socket.io-client');

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
describe('TEST_OVERWORLD', function() {
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

  /* TEST SENDING MESSAGES */
  describe.skip('send_message', function() {
    it('should broadcast the message to all players', function(done) {
      done();
    })
    it('should not do anything for blank messages', function(done) {
      done();
    })
    it('should truncate messages that exceed the maximum length', function(done) {
      done();
    })
  })

  /* TEST RECEIVING MESSAGES */
  describe.skip('receive_message', function() {
   it('should receive a message from another player that sends', function(done) {
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

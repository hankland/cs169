/* Test character creation and selection. */

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

/* Instance variables. */
var Cookies; // store session to simulate logged-in status

describe('TEST_CHARACTERS', function() {
  before(function(done) {
    User.drop();
    Character.drop();
    User.sync();
    Character.sync();

    // add a fake user and log in with it
    request(app)
      .post('/register')
      .send({ user: "Bob", password: "b" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        assert.equal(0, res.body.err);
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  })

  /* TEST CREATING A CHARACTER */
  describe('createCharacter()', function() {
    it('should add a new Character if no existing Character has the same name', function(done) {
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
          done();
        });
    })
    it('should not add a new Character with the same name as an existing Character', function(done) {
      var req = request(app).post('/create_character');
      req.cookies = Cookies;
      req
        .send({ name: "Dog" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(-210, res.body.err);
          done();
        });
    })
    it('should not allow character name lengths < 1 or > 16', function(done) {
      var req = request(app).post('/create_character');
      req.cookies = Cookies;
      req
        .send({ name: "12345678901234567890" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(-200, res.body.err);
          done();
        });
    })
  })

  /* TEST SELECTING A CHARACTER */
  describe('selectCharacter()', function() {
    it('should update the session data upon success', function(done) {
      Character.find({ where: { name: "Dog" } }).success(function(c) {
        var req = request(app).post('/select_character');
        req.cookies = Cookies;
        req
          .send({ character: c.id })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.equal(c.id, res.body.character);
            assert.equal(0, res.body.err);
            done();
          });
      });
    })
    it('should return error if no character was selected', function(done) {
      var req = request(app).post('/select_character');
        req.cookies = Cookies;
        req
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.equal(-220, res.body.err);
            done();
          });
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

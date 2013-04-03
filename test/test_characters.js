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


describe('TEST_AUTHENTICATION', function() {
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
        assert.equal(res.body.err, null);
        done();
      });
  })

  /* TEST CREATING A CHARACTER */
  describe('createCharacter()', function() {
    it('should add a new Character if no existing Character has the same name', function(done) {
      request(app)
        .post('/create_character')
        .send({ name: "Dog" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(res.body.err, null);
          done();
        });
    })
    it('should not add a new Character with the same name as an existing Character', function(done) {
      request(app)
        .post('/create_character')
        .send({ name: "Dog" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(res.body.err, -210);
          done();
        });
    })
    it('should not allow character name lengths < 1 or > 16', function(done) {
      request(app)
        .post('/create_character')
        .send({ name: "12345678901234567890" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(res.body.err, -200);
          done();
        });
    })
  })

  /* TEST SELECTING A CHARACTER */
  describe('selectCharacter()', function() {
    it('should update the session data upon success', function(done) {
      var c = Character.find({ where: { name: "Dog" } });
      request(app)
        .post('/select_character')
        .send({ character: c.id })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(res.body.err, null);
          done();
        });
    })
    it('should return error if no character was selected', function(done) {
      request(app)
        .post('/select_character')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          assert.equal(res.body.err, -220);
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

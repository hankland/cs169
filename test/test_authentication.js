/* Test the login/registration system. */

var lib_path = process.env['LIB_COV'] ? '../lib-cov' : '../lib';
//lib_path = '..';

/* Test-related tools. */
var assert = require('assert');
var should = require('should');
var request = require('supertest');

/* Our server. */
var app = require(lib_path + '/app');

/* Our models. */
User = require(lib_path + '/models').User;
Character = require(lib_path + '/models').Character;

describe('TEST_AUTHENTICATION', function() {
  before(function(done) {
    User.drop();
    User.sync();
    done();
  })

  /* TEST REGISTRATION */
  describe('POST /register', function() {
    it('should add a new User if no existing User has the same name', function(done) {
      request(app)
        .post('/register')
        .send({ user: "Annie", password: "a" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(0, res.body.err);
          done();
        });
    })
    it('should not add a new User with the same name as an existing User', function(done) {
      request(app)
        .post('/register')
        .send({ user: "Annie", password: "b" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(-110, res.body.err);
          done();
        });
    })
    it('should not allow username/password lengths < 1 or > 16', function(done) {
      request(app)
        .post('/register')
        .send({ user: "", password: "12345678901234567890" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(-100, res.body.err);
          done();
        });
    })
  })

  /* TEST LOGGING IN */
  describe('POST /login', function() {
    it('should set the session data upon success', function(done) {
      request(app)
        .post('/login')
        .send ({ user: "Annie", password: "a" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(0, res.body.err);
          done();
        });
    })
    it('should return error for non-existent users', function(done) {
      request(app)
        .post('/login')
        .send ({ user: "Lenny", password: "lenny" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(-111, res.body.err);
          done();
        });
    })
    it('should return error for incorrect passwords', function(done) {
      request(app)
        .post('/login')
        .send({ user: "Annie", password: "c" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert.equal(-101, res.body.err);
          done();
        });
    })
  })

  /* TEST LOGGING OUT */
  describe('POST /logout', function() {
    it('should clear session data', function(done) {
      request(app)
        .get('/logout')
        .end(function(err, res) {
          res.header['location'].should.include('/');
          done();
        });
    })
  })
  
  after(function(done) {
    User.drop();
    User.sync();
    done();
  })
})

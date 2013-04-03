/* Test the login/registration system. */

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

/* TEST REGISTRATION */
describe('POST /register', function() {
  before(function() {
    // User.sync({ force: true });
  })
  it('should add a new User if no existing User has the same name', function(done) {
    request(app)
      .post('/register')
      .send({ user: "Annie", password: "a" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('should not add a new User with the same name as an existing User', function(done) {
    done();
  })
  it('should not allow username/password lengths < 1 or > 16', function(done) {
    done();
  })
})

/* TEST LOGGING IN */
describe('POST /login', function() {
  it('should set the session data upon success', function(done) {
    request(app)
      .post('/login')
      .send ({ user: "Lenny", password: "lenny" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('should return error for non-existent users', function(done) {
    request(app)
      .post('/login')
      .send ({ user: "Lenny2", password: "lenny2" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
  it('should return error for incorrect passwords', function(done) {
    done();
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


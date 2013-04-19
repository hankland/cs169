/* Test the battle system. */

/* Test-related tools. */
var assert = require('assert');
var should = require('should');
var request = require('supertest');

/* Our server. */
var app = require('../app');

/* Our routes. */
var endBattle = require('../routes/end_battle');
var battleCommands = require('../routes/battle_commands');

/* Our models. */
User = require('../models').User;
Character = require('../models').Character;
Monster = require('../models').Monster;

describe('TEST_BATTLE', function() {
  before(function(done) {
    User.drop();
    Character.drop();
    Monster.drop();
    User.sync();
    Character.sync();
    Monster.sync();
    
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

  describe('endBattle', function() {
    it('should return to game overworld', function(done) {
      request(app)
        .get('/end_battle')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          done();
        });
    })
  })

  describe('updateExperience', function() {
    it('should raise experience', function(done) {
      Character.find(1).success(function(c) {
        request(app)
          .post('/update_experience')
          .send({ character: c, experience: 14 })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            done();
          });
      });
    })
  })

  describe('flee', function() {
    it('should return true or false', function(done) {
      Character.find({where: {name: "Bob"}}).success(function(c) {
        request(app)
          .post('/flee')
          .send({})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            assert.notEqual(null, res.body.success);
            done();
          });
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

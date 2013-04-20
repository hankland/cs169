/* Test the battle system. */

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
Monster = require(lib_path + '/models').Monster;

/* Our instance variables. */
var Cookies; // store session to simulate logged-in status

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
                Monster.create().success(function(m) {
                  assert.equal(1, m.id);
                  done();
                });
              });
          });
      });
  })

  /* TEST UPDATE EXPERIENCE. */
  describe('updateExperience', function() {
    it('should raise experience', function(done) {
      Character.find({where: {name: "Dog"}}).success(function(c) {
        var req = request(app).post('/update_experience');
        req.cookies = Cookies;
        req
          .send({ cid: c.id, experience: 14 })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.equal(1, res.body.newLevel);
            assert.equal(14, res.body.newExperience);
            done();
          });
      });
    })
    it('should level up when accumulated experience > 100', function(done) {
      Character.find({where: {name: "Dog"}}).success(function(c) {
        var req = request(app).post('/update_experience');
        req.cookies = Cookies;
        req
          .send({ cid: c.id, experience: 253 })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.equal(3, res.body.newLevel);
            assert.equal(67, res.body.newExperience);
            done();
          });
      });
    })
  })

  /* TEST ATTACK. */
  describe('attack', function() {
    it('should decrease the target\'s HP', function(done) {
      Character.find({where: {name: "Dog"}}).success(function(c1) {
        Character.find({where: {name: "Cat"}}).success(function(c2) {
          var req = request(app).post('/attack');
          req.cookies = Cookies;
          req
            .send({cid: c1, mid: c2})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              assert.equal(null, res.body.err);
              done();
            });
        });
      });
    })
    it('should do nothing if no attacker or attackee provided', function(done) {
      request(app)
        .post('/attack')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          assert.equal(500, res.body.err);
          done();
        });
    })
  })

  /* TEST FLEE. */
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

  /* TEST ENTERING BATTLE. */
  describe('/battle', function() {
    it('should enter battle', function(done) {
      Character.find({where: {name: "Bob"}}).success(function(c) {
        Monster.find(1).success(function(m) {
          var req = request(app).get('/battle');
          req.cookies = Cookies;
          req
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              done();
            });
        });
      });
    })
  })

  /* TEST ENDING BATTLE. */
  describe('/endBattle', function() {
    it('should return to game overworld', function(done) {
      var req = request(app).get('/endBattle');
      req.cookies = Cookies;
      req
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          done();
        });
    })
  })

  after(function(done) {
    User.drop();
    Character.drop();
    Monster.drop();
    User.sync();
    Character.sync();
    Monster.sync();
    done();
  })
})

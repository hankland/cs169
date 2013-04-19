/** BATTLE COMMAND METHODS. */

Character = require('../models').Character;
Monster = require('../models').Monster;

/* SOME CONSTANTS. */
var FLEE_RATE = 2;

module.exports = {
  attack: function(req, res) { // ATTACK: damage the target with a basic attack
    var character = req.body.character;
    var monster = req.body.monster;
    if (!character || !monster) {
      res.json({err: 500});
    } else {
      var physicalAttack = character.physical_attack;
      var physicalDefense = monster.physical_defense;
      var damage = physicalAttack - physicalDefense;
      var newHealth = character.current_monster_health - damage;
      var isDead = false;
      if (newHealth <= 0) {
        newHealth = 0;
        isDead = true;
      }
      character.current_monster_health = newHealth;
      character.save().success(function() {
        res.json({damage: damage, newHealth: newHealth, isDead: isDead});
      });
    }
  },
  flee: function(req, res) { // FLEE: attempt to run away from and end the battle
    var r = Math.floor((Math.random() * FLEE_RATE) + 1);
    if (r == FLEE_RATE) {
      res.json({success: true});
    } else {
      res.json({success: false});
    }
  },
  defend: function(req, res) {}, // DEFEND: block incoming damage during the enemy's next turn
  useSkill: function(req, res) {}, // USESKILL: use a special skill
  useItem: function(req, res) {} // USEITEM: use an item
};

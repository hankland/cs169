/** BATTLE COMMAND METHODS. */

Character = require('../models').Character;
Monster = require('../models').Monster;

/* SOME CONSTANTS. */
var FLEE_RATE = 2;

module.exports = {
  attack: function(req, res) { // ATTACK: damage the enemy with a basic attack
    var attacker, attackee;
    attacker = req.body.attacker;
    attackee = req.body.attackee;
    if (!attacker || !attackee) {
      res.json({err: 500});
    } else {
      var physicalAttack = attacker.physical_attack;
      var physicalDefense = attackee.physical_defense;
      var damage = physicalAttack - physicalDefense;
      var newHealth = attackee.current_health_points - damage;
      if (newHealth < 0) {
        newHealth = 0;
      }
      attackee.current_health_points = newHealth;
      attackee.save().success(function() {
        res.json({damage: damage, newHealth: newHealth});
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
  defend: function() {}, // DEFEND: block incoming attacks during the enemy's next turn
  useSkill: function() {}, // USESKILL: use a special skill
  useItem: function() {} // USEITEM: use an item
};

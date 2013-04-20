/** BATTLE COMMAND METHODS. */

Character = require('../models').Character;
Monster = require('../models').Monster;

/* SOME CONSTANTS. */
var FLEE_RATE = 2;

module.exports = {
  attack: function(req, res) { // ATTACK: damage the enemy with a basic attack
    Character.find(req.body.cid).success(function(attacker) {
      Character.find(req.body.mid).success(function(attackee) {
        if (!attacker || !attackee) {
          res.json({err: 500});
        } else {
          var isDead = false; // TRUE if the attack kills the target
          var physicalAttack = attacker.physical_attack;
          var physicalDefense = attackee.physical_defense;
          var damage = physicalAttack - physicalDefense;
          if (damage < 0) {
            damage = 0;
          } else if (damage > attackee.current_health_points) {
            damage = attackee.current_health_points;
          }
          var newHealth = attackee.current_health_points - damage;
          if (newHealth <= 0) {
            newHealth = 0;
            isDead = true;
          }
          attackee.current_health_points = newHealth;
          attackee.save().success(function() {
            res.json({damage: damage, newHealth: newHealth, isDead: isDead});
          });
        }
      });
    });
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

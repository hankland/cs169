Character = require('../models').Character;
Monster = require('../models').Monster;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    var attackerType = req.body.attackerType;
    var attacker, attackee;
    if (attackerType == "character") {
      attacker = req.body.attacker; // Character.find(req.body.attacker);
      attackee = req.body.attackee; // Monster.find(req.body.attackee);
    } else if (attackerType == "monster") {
      attacker = req.body.attacker; // Monster.find(req.body.attacker);
      attackee = req.body.attackee; // Character.find(req.body.attackee);
    }
    var physicalAttack = attacker.physical_attack;
    var physicalDefense = attackee.physical_defense;
    var damage = physicalAttack - physicalDefense;
    if (damage < 0) {
      damage = 0;
    }
    attackee.current_health_points
      = attackee.current_health_points - damage;
    attackee.save();
    console.log("Successfully attacked!");
    res.render('battlescreen', { damage: damage });
  }
};

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    var attackerType = req.body.attackerType;
    var attacker, attackee;
    if (attackerType == "character") {
      attacker = req.body.attacker;
      attackee = req.body.attackee;
    } else if (attackerType == "monster") {
      attacker = req.body.attacker;
      attackee = req.body.attackee;
    }
    var physicalAttack = attacker.physical_attack;
    var physicalDefense = attackee.physical_defense;
    var damage = physicalAttack - physicalDefense;
    if (damage < 0) {
      damage = 0;
    }
    attackee.current_health_points
      = attackee.current_health_points - damage;
    attackee.save();
    console.log("Successfully attacked!");
    res.render('battlescreen', { damage: damage });
  }
};

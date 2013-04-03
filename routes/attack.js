Character = require('../models').Character;
Monster = require('../models').Monster;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    var attackerType = req.body.attackerType;
    var attacker, attackee;
    if (attackerType == "character") {
      attacker = Character.find(req.body.attacker);
      attackee = Monster.find(req.body.attackee);
    } else if (attackerType == "monster") {
      attacker = Monster.find(req.body.attacker);
      attackee = Character.find(req.body.attackee);
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

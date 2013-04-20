Character = require('../models').Character;
Monster = require('../models').Monster;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    Character.find(req.session.character).success(function(c) {
      Monster.findAll().success(function(monsters) {
        if (monsters.length == 0) {
          res.json({err: 500});
        } else {
      	  // var randomMonsterID = Math.floor((Math.random() * monsters.length) + 1);
          var randomMonsterID = 1;
          Monster.find({where: {id: randomMonsterID}}).success(function(m) {
      	    c.setMonster(m);
            c.current_monster_health = m.health_points;
            c.current_monster_magic = m.magic_points;
            // c.in_battle = true;
            c.save().success(function() {
              res.render('battlescreen', { character: c, monster: m });
            });
          });
        }
      });
    });
  }
};

Character = require('../models').Character;

module.exports = function(req, res){
  Character.find(req.body.cid).success(function(c) {
    var cumulExperience = c.experience + req.body.experience;
    var levelIncrease = Math.floor(cumulExperience / 100);
    var newExperience = cumulExperience % 100;
    c.increment('level', levelIncrease).success(function() {
      c.experience = newExperience;
      c.save(['experience']).success(function() {
        res.json({character: c, newLevel: c.level, newExperience: c.experience});
      });
    });
  });
};

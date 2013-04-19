Character = require('../models').Character;

module.exports = function(req, res) {
  Character.find(req.body.cid).success(function(c) {
    if (!c) {
      res.json({ err: 500 });
    } else {
      var cumulExperience = c.experience + req.body.experience;
      var levelIncrease = Math.floor(cumulExperience / 100);
      var newExperience = cumulExperience % 100;
      var newLevel = c.level + levelIncrease;
      c.level = newLevel;
      c.experience = newExperience;
      c.save().success(function() {
        res.json({ character: c,
                   newLevel: newLevel,
                   newExperience: newExperience,
                   levelIncrease: levelIncrease });
      });
    }
  });
};

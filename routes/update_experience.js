Character = require('../models').Character;

module.exports = function(req, res){
  var c = req.body.character;
  if (!c) {
    res.json({ character: c });
  } else {
    c.increment('experience', req.body.experience).success(function() {
      res.json({ character: c, newExperience: c.experience });
    });
  }
};

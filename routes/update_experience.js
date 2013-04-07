Character = require('../models').Character;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    Character.find(req.session.character).success(function(c) {
      c.experience += req.body.experience;
      c.save();
    });
  }
};

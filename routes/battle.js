Character = require('../models').Character;
Monster = require('../models').Monster;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    Character.find(req.session.character).success(function(c) {
      Monster.create().success(function(m) {
        console.log("Entering battle...");
        res.render('battlescreen', { character: c, monster: m });
      });
    });
  }
};

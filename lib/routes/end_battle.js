Character = require('../models').Character;
Monster = require('../models').Monster;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    console.log("Battle ended!");
    res.render('play', {});
  }
};

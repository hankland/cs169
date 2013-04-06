Character = require('../models').Character;
Monster = require('../models').Monster;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    m.destroy().success(function() {
      console.log("Battle ended!");
      res.render('play', {});
    });
    /*
    Monster.find(req.body.monster).success(function(m) {
      m.destroy().success(function() {
        console.log("Battle ended!");
        res.render('play', {});
      });
    });
    */
  }
};

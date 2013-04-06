Character = require('../models').Character;
Monster = require('../models').Monster;

module.exports = function(req, res){
  if (!req.session.user || !req.session.character) {
    res.redirect("/");
  } else {
    Character.find(req.session.character).success(function(c) {
      /* Fix this */
      Monster.create({}).success(function(m) {
        console.log("debug battle: " + c + " " + m + " " + c.current_health_points + " " + m.current_health_points);
        console.log("Entering battle...");
        res.render('battlescreen', { character: c, monster: m });
      });
    });
  }
};

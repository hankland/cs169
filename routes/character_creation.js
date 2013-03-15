Class = require('../models').Class;

module.exports = function(req, res){
  if (!req.session.user) {
    res.redirect("/");
  } else {
    console.log(User + Class);
    User.find(req.session.user).success(function f(u) {
      Class.all().success(function(jobs) {
        res.render('character_creation', {
          title: "A New MMORPG",
          username: u.username,
          jobs: jobs
        });
      });
    });
  }
};

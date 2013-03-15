module.exports = function(req, res){
  if (!req.session.user) {
    res.redirect("/");
  } else {
    User.find(req.session.user).success(function f(u) {
      res.render('play', {
        title: "A New MMORPG",
        username: u.username
      });
    });
  }
};

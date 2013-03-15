module.exports = function(req, res){
  if (!req.session.user) {
    res.redirect("/");
  } else {
    User.find(req.session.user).success(function f(u) {
      u.getCharacters().success(function(characters) {
        res.render('account', {
          title: "A New MMORPG",
          username: u.username,
          characters: characters
        });
      });
    });
  }
};

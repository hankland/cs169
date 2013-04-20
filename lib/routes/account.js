module.exports = function(req, res){
  if (!req.session.user) {
    res.redirect("/");
  } else {
    User.find(req.session.user).success(function f(u) {
      u.getCharacters().success(function (charArray) {
        res.render('account', {
          username: u.username,
          characters: charArray,
          currentCharacter: req.session.character
        });
      });
    });
  }
};

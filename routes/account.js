module.exports = function(req, res){
  if (!req.session.user) {
    res.redirect("/");
  } else {
    User.find(req.session.user).success(function f(u) {
      res.render('account', { name: u.name });
    });
  }
};

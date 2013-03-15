module.exports = function(req, res){
  console.log("LOGOUT: Printing session data...\n" + req.session.user);
  if (req.session) {
    req.session.destroy();
  }
  res.redirect("/");
};


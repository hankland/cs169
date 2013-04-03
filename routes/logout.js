module.exports = function(req, res){
  // console.log("LOGOUT: Printing session data...\n" + req.session.user);
  if (req.session) {
    // console.log("LOGOUT: Logout successful!");
    req.session.destroy();
  }
  res.redirect("/");
};


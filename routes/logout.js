module.exports = function(req, res){
  if (req.session) {
    req.session.destroy();
  } 
  res.redirect("/");
};


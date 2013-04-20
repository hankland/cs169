/*
 * GET home page.
 */

exports.index = function(req, res) {
  if (req.session.user) {
    res.redirect("/account");
  } else {
    res.render('index', { title: 'A New MMORPG' });
  }
};


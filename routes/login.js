User = require('../models').User;

module.exports = function(req, res) {
  res.type('application/json');
  if (!req.session.user) {
    User.find({where: {username: req.body.user}}).success(function(u) {
      if (u != null) {
        if (req.body.password == u.password) {
          req.session.user = u.id;
          res.json({user: u, err: 0});
        } else { /* BAD PASSWORD ERROR */
          res.json({err: -101});
        }
      } else { /* USER DOESN'T EXIST ERROR */
        res.json({err: -111});
      }
    });
  } else { /* NOT LOGGED IN ERROR */
    res.json({err: -999});
  }
}


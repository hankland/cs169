User = require('../models').User;

module.exports = function(req, res) {
  res.type('application/json');
  if (!req.session.user) {
    User.find({where: {username: req.body.user}}).success(function(user) {
      if (user == null) {
        var u = User.build({username: req.body.user, password: req.body.password});
        var errors = u.validate();
        if (!errors) {
          u.save();
          User.find({where: {username: req.body.user}}).success(function(u) {
            req.session.user = u.id;
            res.json({user: u, err: 0});
          });
        } else { /* INVALID USERNAME/PASSWORD ERROR */
          res.json({err: -100});
        }
      } else { /* USER ALREADY EXISTS ERROR */
        res.json({err: -110});
      }
    });
  } else { /* ALREADY LOGGED IN ERROR */
    res.json({err: -999});
  }
}


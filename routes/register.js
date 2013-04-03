User = require('../models').User;

module.exports = function(req, res) {
  // console.log(JSON.stringify(req.body));
  res.type('application/json');
  // console.log("REGISTER: Printing session data...\n" + req.session.user);
  if (!req.session.user) {
    User.find({where: {username: req.body.user}}).success(function(user) {
      // console.log("REGISTER: Checking if user doesn't already exist...");
      if (user == null) {
        var u = User.build({username: req.body.user, password: req.body.password});
        // console.log("REGISTER: Checking if given username and password are valid entries...");
        var errors = u.validate();
        if (!errors) {
          // console.log("REGISTER: Registration successful!");
          u.save();
          User.find({where: {username: req.body.user}}).success(function(u) {
            // console.log("TESTING: " + req.body);
            req.session.user = u.id;
            res.json({user: u});
          });
        } else { /* INVALID USERNAME/PASSWORD ERROR */
          // console.log("REGISTER: Invalid username and/or password... (FAILURE)");
          res.json({err: User.BAD_USER_ERROR});
        }
      } else { /* USER ALREADY EXISTS ERROR */
        // console.log("REGISTER: User with name already exists... (FAILURE)");
        res.json({err: User.EXISTS_ERROR});
      }
    });
  } else { /* NOT LOGGED IN ERROR */
    // console.log("REGISTER: User isn't logged in... (FAILURE)");
    res.json({err: -999});
  }
}


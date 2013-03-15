User = require('../models').User;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  res.type('application/json');
  console.log("REGISTER: Printing session data...\n" + req.session.user);
  if (!req.session.user && req.body.user && req.body.password) {
    User.find({where: {username: req.body.user}}).success( function(u) {
      console.log("REGISTER: Checking if user doesn't already exist...");
      if (u == null) {
        User.build({username: req.body.user, password: req.body.password})
	  .success(function(u) {
            console.log("REGISTER: Checking if given username and password are valid entries...");
            var errors = u.validate();
            if (!errors) {
              console.log("REGISTER: Registration successful!");
              u.save();
              req.session.user = u.id;
              res.json({err: User.SUCCESS});
            } else { /* INVALID USERNAME/PASSWORD ERROR */
              console.log("REGISTER: Invalid username and/or password... (FAILURE)");
              res.json({err: User.UNKNOWN_ERROR});
            }
          });
      } else { /* USER ALREADY EXISTS ERROR */
        console.log("REGISTER: User with name already exists... (FAILURE)");
        res.json({err: User.BAD_USER_ERROR});
      }
    });
  } else { /* BAD REQUEST ERROR */
    console.log("REGISTER: Bad request... (FAILURE)");
    res.json({err: User.UNKNOWN_ERROR});
  }
}


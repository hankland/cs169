User = require('../models').User;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  res.type('application/json');
  console.log("LOGIN: Printing session data...\n" + req.session.user);
  if (!req.session.user) {
    User.find({where: {username: req.body.user}}).success(function(u) {
      console.log("LOGIN: Checking if user actually exists...");
      if (u != null) {
        console.log("LOGIN: Checking if password is correct...");
        if (req.body.password == u.password) {
          console.log("LOGIN: Login successful!");
          req.session.user = u.id;
          res.json({user: u});
        } else { /* BAD PASSWORD ERROR */
          console.log("LOGIN: Wrong password provided... (FAILURE)");
          res.json({err: User.BAD_PASSWORD_ERROR});
        }
      } else { /* USER DOESN'T EXIST ERROR */
        console.log("LOGIN: User doesn't exist... (FAILURE)");
        res.json({err: User.NOT_EXISTS_ERROR});
      }
    });
  } else { /* NOT LOGGED IN ERROR */
    console.log("LOGIN: User isn't logged in... (FAILURE)");
    res.json({err: -999});
  }
}


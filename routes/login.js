User = require('../models').User;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  res.type('application/json');
  console.log("REGISTER: Printing session data...\n" + req.session.user);
  if (!req.session.user && req.body.user) {
    User.find({where: {username: req.body.user}}).success( function(u) {
      console.log("LOGIN: Checking if user actually exists...");
      if (u != null) {
        console.log("LOGIN: Checking if password is correct...");
        if (req.body.password == u.password) {
          console.log("LOGIN: Login successful!");
          req.session.user = u.id;
          res.json({err: User.SUCCESS});
        } else { /* BAD PASSWORD ERROR */
          console.log("LOGIN: Wrong password provided... (FAILURE)");
          res.json({err: User.BAD_PASSWORD_ERROR});
        }
      } else { /* USER DOESN'T EXIST ERROR */
        console.log("LOGIN: User doesn't exist... (FAILURE)");
        res.json({err: User.BAD_USER_ERROR});
      }
    });
  } else { /* BAD REQUEST ERROR */
    console.log("LOGIN: Bad request... (FAILURE)");
    res.json({err: User.UNKNOWN_ERROR});
  }
}


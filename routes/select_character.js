User = require('../models').User;
Character = require('../models').Character;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  console.log("SELECT_CHARACTER: Printing session data...\n" + req.session.user);
  if (req.session.user) {
    if(req.body.character) {
      req.session.character = req.body.character;
      res.json({err:0});
    } else {
      res.json({err:-10});
    }
  } else { /* NOT LOGGED IN ERROR */
    console.log("SELECT_CHARACTER: User isn't logged in... (FAILURE)");
    res.json({err: -10});
  }
}


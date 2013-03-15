User = require('../models').User;
Character = require('../models').Character;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  console.log("SELECT_CHARACTER: Printing session data...\n" + req.session.user);
  if (req.session.user) {
    User.find(req.session.user)
      .success(function(user) {
        var character = req.body.character;
        console.log("SELECT_CHARACTER: Checking if logged-in user owns requested character...");
        user.hasCharacter(character)
          .success(function(result) {
            if (result) {
              // TO-DO: render overworld
              // TO-DO: return json stuff
              console.log("SELECT_CHARACTER: Successfully selected character. Entering game...");
              res.json({character: character});
            } else { /* DOESN'T OWN CHARACTER ERROR */
              console.log("SELECT_CHARACTER: User doesn't own character... (FAILURE)");
              res.json({err: -10});
            }
          });
       });
  } else { /* NOT LOGGED IN ERROR */
    console.log("SELECT_CHARACTER: User isn't logged in... (FAILURE)");
    res.json({err: -10});
  }
}

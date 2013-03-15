User = require('../models').User;
Character = require('../models').Character;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  console.log("CREATE_CHARACTER: Printing session data...\n" + req.session.user);
  if (req.session.user) {
    Character.find({where: {name: req.body.name}}).success(function(character) {
      console.log("CREATE_CHARACTER: Checking if character name doesn't already exist...");
      if (character == null) {
        var c = Character.build({name: req.body.name, xpos: 0, ypos: 0}); // TO-DO: should set xpos and ypos to some particular initial coordinates
        c.UserId = req.session.user;
        console.log("CREATE_CHARACTER: Checking if character details are valid...");
        var errors = c.validate();
	if (!errors) {
          console.log("CREATE_CHARACTER: Character creation successful!");
          c.save().success(function () {
            req.session.character = c.id;
          });
          res.json({err: 0});
        } else {
          console.log("CREATE_CHARACTER: Invalid character details... (FAILURE)");
          res.json({err: -10});
        }
      } else { /* CHARACTER NAME ALREADY EXISTS ERROR */
        console.log("CREATE_CHARACTER: Name already exists... (FAILURE)");
        res.json({err: -10});
      }
    });
  } else { /* NOT LOGGED IN ERROR */
    console.log("CREATE_CHARACTER: User isn't logged in... (FAILURE)");
    res.json({err: -10});
  }
}


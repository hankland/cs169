User = require('../models').User;
Character = require('../models').Character;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  console.log("CREATE_CHARACTER: Printing session data...\n" + req.session.user);
  if (req.session.user) {
    Character.find({where: {name: req.body.name}}).success(function(character) {
      console.log("CREATE_CHARACTER: Checking if character name doesn't already exist...");
      if (character == null) {
        var c = Character.build({name: req.body.name});
        c.UserId = req.session.user;
        console.log("CREATE_CHARACTER: Checking if character details are valid...");
        var errors = c.validate();
	if (!errors) {
          console.log("CREATE_CHARACTER: Character creation successful!");
          c.save().success(function () {
            req.session.character = c.id;
          });
          res.json({err: 0});
        } else { /* INVALID CHARACTER DETAILS ERROR */
          console.log("CREATE_CHARACTER: Invalid character details... (FAILURE)");
          res.json({err: -200});
        }
      } else { /* CHARACTER NAME ALREADY EXISTS ERROR */
        console.log("CREATE_CHARACTER: Character name already exists... (FAILURE)");
        res.json({err: -210});
      }
    });
  } else { /* NOT LOGGED IN ERROR */
    console.log("CREATE_CHARACTER: User isn't logged in... (FAILURE)");
    res.json({err: -999});
  }
}


User = require('../models').User;
Character = require('../models').Character;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  console.log("CREATE_CHARACTER: Printing session data...\n" + req.session.user);
  if (req.session.user) {
    var user = User.find(req.session.user);
    var job = req.body.job;
    var area = null; // TO-DO: should be some particular initial area
    Character.find({where: {name: req.body.name}}).success(function(c) {
      console.log("CREATE_CHARACTER: Checking if character name doesn't already exist...");
      if (c == null) {
        Character.build({name: req.body.name, xpos: 0, ypos: 0})
          .success(function (c) { // TO-DO: should set xpos and ypos to some particular initial coordinates
            c.setUser(user);
            c.setClass(job);
            c.setArea(area);
            console.log("CREATE_CHARACTER: Checking if character details are valid...");
            c.validate()
              .success(function() {
                console.log("CREATE_CHARACTER: Character creation successful!");
                c.save();
                res.json({character: c});
              })
              .error(function() {
                console.log("CREATE_CHARACTER: Invalid character details... (FAILURE)");
                res.json({err: -10});
              });
          });
      } else { /* CHARACTER NAME ALREADY EXISTS ERROR */
        console.log("CREATE_CHARACTER: Name already exists... (FAILURE)");
        res.json({err: Character.NAME_EXISTS_ERROR});
      }
    });
  } else { /* NOT LOGGED IN ERROR */
    console.log("CREATE_CHARACTER: User isn't logged in... (FAILURE)");
    res.json({err: -10});
  }
}


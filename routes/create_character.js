Character = require('../models').Character;
User = require('../models').User;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  if (req.session.user) {
    var user = User.find(req.session.user);
    var job = req.body.job;
    var area = null; // SHOULD BE INITIAL AREA
    Character.find({where: {name: req.body.name}}).success( function(c) {
      if (c == null) { /* CHARACTER MAY BE CREATED */
        Character.build({name: req.body.name, xpos: 0, ypos: 0}).success(function (c) { // MIGHT NEED TO CHANGE INITIAL XPOS AND YPOS
          c.setUser(user);
          c.setClass(job);
          c.setArea(area);
          c.validate()
            .success(function() {
              c.save();
              res.json({character: c});
            })
            .error(function() {
              res.json({err: -10});
            });
        });
      } else { /* CHARACTER NAME ALREADY EXISTS */
        res.json({err: Character.NAME_EXISTS_ERROR});
      }
    });
  } else { /* SOME USER ISN'T LOGGED IN */
    res.json({err: -10});
  }
}


User = require('../models').User;
Character = require('../models').Character;

/* REQ should contain:
 *  req.session.user: The currently logged-in user.
 *  req.body.job: The desired job/class name.
 *  req.body.job: The desired character name.
 */
module.exports = function(req, res) {
  if (req.session.user) {
    Character.find({where: {name: req.body.name}}).success(function(character) {
      if (character == null) {
        var c = Character.build({name: req.body.name});
        c.UserId = req.session.user;
        var errors = c.validate();
	if (!errors) {
          c.save().success(function () {
            req.session.character = c.id;
            res.json({cid: c.id, err: 0});
          });
          //res.json({err: 0});
        } else { /* INVALID CHARACTER DETAILS ERROR */
          res.json({err: -200});
        }
      } else { /* CHARACTER NAME ALREADY EXISTS ERROR */
        res.json({err: -210});
      }
    });
  } else { /* NOT LOGGED IN ERROR */
    res.json({err: -999});
  }
}


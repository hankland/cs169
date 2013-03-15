User = require('../models').User;
Character = require('../models').Character;

/* REQ should contain:
 *  req.session.user: The currently logged-in user.
 *  req.body.character: The selected character.
 */
module.exports = function(req, res) {
  if (req.session.user) {
    if(req.body.character) {
      req.session.character = req.body.character;
      res.json({character: req.session.character});
    } else { /* NO CHARACTER SELECTED ERROR */
      res.json({err: -220});
    }
  } else { /* NOT LOGGED IN ERROR */
    res.json({err: -999});
  }
}


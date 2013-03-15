User = require('../models').User;
Character = require('../models').Character;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  if (req.session.user) {
    var user = User.find(req.session.user)
      .success(function(u) {
        var character = req.body.character;
        user.hasCharacter(character)
          .success(function() {
            // render overworld
            // return json stuff
            console.log("Successfully selected character. Entering game...");
            res.json({err: 1});
          });
       });
  } else { /* SOME USER ISN'T LOGGED IN */
    res.json({err: -10});
  }
}


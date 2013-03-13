User = require('../models').User;

module.exports = function(req, res) {
  console.log(JSON.stringify(req.body));
  if (!req.session.user && req.body.user) {
    User.find({where: {name: req.body.user}}).success( function(u) {
      if (u == null) { 
        User.create({name: req.body.user}).success(function f(u) {
          req.session.user = u.id;
          res.type('application/json');
          res.json({err: 0});
        });
      } else {
        req.session.user = u.id;
        res.type('application/json');
        res.json({err: 0});
      }
    });
  } else { 
    res.type('application/json');
    res.json({err: 1});
  }
}


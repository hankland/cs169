var Sequelize = require('sequelize');

var sequelize = new Sequelize('cs169','cs169','cs169', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

var User = sequelize.import(__dirname + '/models/user');
var Character = sequelize.import(__dirname + '/models/character');
var Area = sequelize.import(__dirname + '/models/area');
var Class = sequelize.import(__dirname + '/models/class');

Class.hasMany(Character);
User.hasMany(Character);
Area.hasMany(Character);


module.exports.User = User;
module.exports.Character = Character;
module.exports.Area = Area;
module.exports.Class = Class;

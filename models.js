var Sequelize = require('sequelize');

var sequelize = new Sequelize('cs169','cs169','cs169', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  omitNull: true
});

var User = sequelize.import(__dirname + '/models/user');
var Character = sequelize.import(__dirname + '/models/character');
var Area = sequelize.import(__dirname + '/models/area');
var Class = sequelize.import(__dirname + '/models/class');
var Monster = sequelize.import(__dirname + '/models/monster');
var Item = sequelize.import(__dirname + '/models/item');

Class.hasMany(Character);
User.hasMany(Character);
User.hasMany(Item);
Area.hasMany(Character);
Area.hasMany(Monster);
Character.hasOne(Monster);

module.exports.User = User;
module.exports.Character = Character;
module.exports.Area = Area;
module.exports.Class = Class;
module.exports.Monster = Monster;
module.exports.Item = Item;

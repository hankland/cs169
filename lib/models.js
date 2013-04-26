var Sequelize = require('sequelize');

/* Initialize Sequelize, our Object Relational Mapper. */
var sequelize = new Sequelize('cs169','cs169','cs169', {
  host: 'anewmmorpg.nodejitsu.com',
  port: 8080,
  dialect: 'postgres',
  omitNull: true
});

/* Import the models. */
var User = sequelize.import(__dirname + '/models/user');
var Character = sequelize.import(__dirname + '/models/character');
var Area = sequelize.import(__dirname + '/models/area');
var Class = sequelize.import(__dirname + '/models/class');
var Monster = sequelize.import(__dirname + '/models/monster');
var Item = sequelize.import(__dirname + '/models/item');

/* Model associations. */
Class.hasMany(Character);
User.hasMany(Character);
Character.hasMany(Item);
Area.hasMany(Character);
Area.hasMany(Monster);
Character.hasOne(Monster);

/* Fields to access models more easily. */
module.exports.User = User;
module.exports.Character = Character;
module.exports.Area = Area;
module.exports.Class = Class;
module.exports.Monster = Monster;
module.exports.Item = Item;

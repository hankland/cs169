var Sequelize = require('sequelize');

/* Initialize Sequelize, our Object Relational Mapper. */
var sequelize = null;
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  // the application is executed on Heroku ... use the postgres database
  var match = process.env.HEROKU_POSTGRESQL_GREEN_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    omitNull: true
  });
} else {
  console.log("not heroku@@@@@@@@@@@@@@@@@@@@@@@@@");
  sequelize = new Sequelize('cs169','cs169','cs169', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    omitNull: true
  });
}


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

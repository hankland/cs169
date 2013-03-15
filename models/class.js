Class = require('../models').Class;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Class', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  })
}



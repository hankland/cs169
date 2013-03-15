Class = require('../models').Class;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Class', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    description: {
      type: DataTypes.TEXT
    }
  })
}



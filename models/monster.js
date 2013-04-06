/* MONSTER MODEL. */

/* Some constants I've added for now. */
var MIN_NAME_LENGTH = 1;
var MAX_NAME_LENGTH = 16;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Monster', {
    name: {
      type: DataTypes.STRING,
      defaultValue: "Monster",
      validate: {
        notNull: true,
        len: [MIN_NAME_LENGTH, MAX_NAME_LENGTH]
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "A generic monster. Kill it for experience!"
    },
    experience: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    health_points: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    magic_points: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    physical_attack: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    magic_attack: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    physical_defense: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    magic_defense: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });
}



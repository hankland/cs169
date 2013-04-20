/* ITEM MODEL. */

/* Some constants I've added for now. */
var MIN_NAME_LENGTH = 1;
var MAX_NAME_LENGTH = 16;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      defaultValue: "Item",
      validate: {
        notNull: true,
        len: [MIN_NAME_LENGTH, MAX_NAME_LENGTH]
      }
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "A generic item."
    },
    value: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    damage: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status_effect: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  });
}


/* CHARACTER MODEL. */

/* Some constants I've added for now. */
var MIN_NAME_LENGTH = 1;
var MAX_NAME_LENGTH = 16;
var MAX_INVENTORY_SIZE = 16;

/* Error codes. */
var SUCCESS = 0;
var BAD_CHARACTER_ERROR = -200; /* Generic error for failed validations. */
var EXISTS_ERROR = -210; /* Character name already exists. */
var NOT_SELECTED_ERROR = -220; /* A character hasn't been selected. */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Character', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        len: [MIN_NAME_LENGTH, MAX_NAME_LENGTH]
      }
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: 'forest'
    },
    xpos: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    ypos: {
      type: DataTypes.INTEGER,
      defaultValue: 8
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    inventory: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
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
      defaultValue: 10
    },
    magic_attack: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    physical_defense: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    magic_defense: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    current_health_points: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    current_magic_points: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    current_monster_health: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    current_monster_magic: {
      type: DataTypes.INTEGER,
      defaulValue: 0
    },
    in_battle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
}


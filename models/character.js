/* CHARACTER MODEL. */

/* Some constants I've added for now. */
var MIN_NAME_LENGTH = 1;
var MAX_NAME_LENGTH = 16;

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
    xpos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ypos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    health_points: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    magic_points: {
      type: DataTypes.INTEGER,
      defaultValue: 100
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
      defaultValue: 100
    },
    current_magic_points: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    }
  }, {
    instanceMethods: {
      attack: function(target) {
        var physicalAttack = this.physical_attack;
        var physicalDefense = target.physical_defense;
        var damage = physicalAttack - physicalDefense;
        if (damage < 0) {
          damage = 0;
        }
        target.current_health_points = target.current_health_points - damage;
        target.save();
      }
    }
  });
}


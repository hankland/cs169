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
      type: DataTypes.INTEGER
    },
    ypos: {
      type: DataTypes.INTEGER
    }
  });
}



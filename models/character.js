/* CHARACTER MODEL. */

/* Some constants I've added for now. */
var MIN_NAME_LENGTH = 1;
var MAX_NAME_LENGTH = 16;

/* Error codes. */
var SUCCESS = 1;
var UNKNOWN_ERROR = -1; /* Generic catch-all error for now. */
var NAME_EXISTS_ERROR = -2; /* Character name already exists. */
var BAD_NAME_ERROR = -3; /* Generic name-related error. */

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



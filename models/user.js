/* USER MODEL. */

/* Some constants I've added for now. */
var MIN_USERNAME_LENGTH = 1;
var MAX_USERNAME_LENGTH = 16;
var MIN_PASSWORD_LENGTH = 1;
var MAX_PASSWORD_LENGTH = 16;

/* Error codes. */
var SUCCESS = 1;
var UNKNOWN_ERROR = -1; /* Generic catch-all error for now. */
var USER_EXISTS_ERROR = -2; /* User already exists. */
var BAD_USER_ERROR = -3; /* Generic username-related error. */
var BAD_PASSWORD_ERROR = -4; /* Generic password-related error. */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: { /* This user's login name. */
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        len: [MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH]
      }
    },
    password: { /* This user's login password. */
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        len: [MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH]
      }
    }
  });
}


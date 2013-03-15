/* USER MODEL. */

/* Some constants I've added for now. */
var MIN_USERNAME_LENGTH = 1;
var MAX_USERNAME_LENGTH = 16;
var MIN_PASSWORD_LENGTH = 1;
var MAX_PASSWORD_LENGTH = 16;

/* Error codes. */
var SUCCESS = 0;
var BAD_USER_ERROR = -100; /* Generic error for failed validation. */
var BAD_PASSWORD_ERROR = -101; /* Incorrect password for given user. */
var EXISTS_ERROR = -110; /* User already exists. */
var NOT_EXISTS_ERROR = -111; /* User doesn't exist. */

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


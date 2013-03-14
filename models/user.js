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
		},
		email: { /* This user's email. */
			type: DataTypes.STRING,
      validate: {
			  isEmail: true
			}
		}
		/* Potential fields to add: */
		// first_name: DataTypes.STRING,
		// last_name: DataTypes.STRING,
		// salt: DataTypes.STRING,
  })
}
















/* THIS STUFF IS IMPLEMENTED IN CONTROLLER FUNCTIONS FOR NOW */

/*
	classMethods: {
		register: function(username, password, email) {
			var user = User.find({ where: {username: username} })
				.success(function() {
					if (user != null) {
						return USER_EXISTS_ERROR;
					} else {
						// TO-DO: CHECK FOR FIELD CONSTRAINTS FIRST,
						// AND IF 'EMAIL' ISN'T ALSO ALREADY IN THE TABLE
						User.create({
							username: username,
							password: password,
							email: email
						})
							.success(function() { return SUCCESS; }
							.error(function() { return UNKNOWN_ERROR; }
					}
				});
		},
		login: function(username, password) {
			// first ensure that no one's already logged in
			var user = User.find({ where: {username: username} })
				.success(function() {
					if (user.password == password) {
						// LOGIN SUCCESSFULLY
					} else {
						// WRONG PASSWORD ERROR
					}
				});
		},
		logout: function() {
			// log out the logged-in user, if any
		},
	},
	instanceMethods: {
		createCharacter: function(name) {
			// NAME shouldn't already be in table
			// create the character and add to Character table
			// and link that character to this user
			var character = Character.find({ where: {name: name} })
				.success(function() {
					if (character != null) {
						// CHARACTER ALREADY EXISTS ERROR
					} else {
						// TO-DO: CHECK FOR FIELD CONSTRAINTS FIRST
						Character.create({
							name: name,
							// class: job,
						})
					}
				});
		},
		deleteCharacter: function(name) {
			// NAME should be in this user's character list
			// delete the character and remove it from Character table
			// and unlink that character from this user
			// first ensure that no one's already logged in
			var character = Character.find({ where: {name: name} })
				.success(function() {
					character.destroy();
				});
		},
	},
	*/


/* NON-PLAYABLE CHARACTER MODEL. */
/* Characters may interact with NPCs, who exist in a particular Area
 * and have some sort of dialogue. */

/* Constants. */
var MIN_NAME_LENGTH = 1;
var MAX_NAME_LENGTH = 16;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NPC', {
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
    dialogue: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });
}


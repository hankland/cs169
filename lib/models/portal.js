/* PORTAL MODEL. */
/* Characters can enter portals to travel across different areas. */

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
    }
  });
}


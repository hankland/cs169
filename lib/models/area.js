module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Area', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    areatype: {
      type: DataTypes.STRING
    },
    areamap: {
      type: DataTypes.TEXT
    }
  })
}



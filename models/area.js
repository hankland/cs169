module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Area', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    areamap: DataTypes.TEXT 
  })
}



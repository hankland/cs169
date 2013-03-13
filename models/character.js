module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Character', {
    name: DataTypes.STRING,
    xpos: DataTypes.INTEGER,
    ypos: DataTypes.INTEGER
  })
}



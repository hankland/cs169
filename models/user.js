module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    name: DataTypes.STRING 
  })
}



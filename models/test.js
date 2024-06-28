const {DataTypes} = require("sequelize")

module.exports =  (sequelize) => {
  const Test = sequelize.define("test", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
  });
  return Test;
}

const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  const Langue = sequelize.define("langue", {
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
    langue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pourcentage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Langue;
};

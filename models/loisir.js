const {DataTypes} = require("sequelize")

module.exports =  (sequelize) => {
  const Loisir = sequelize.define("loisir", {
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
    nom_loisir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Loisir;
};

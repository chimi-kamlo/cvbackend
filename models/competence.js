const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  const Competence = sequelize.define("competence", {
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
    nom_competence: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Competence;
};

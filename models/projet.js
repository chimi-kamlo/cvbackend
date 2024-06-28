const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  const Projet = sequelize.define("projet", {
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
    nom_projet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entreprise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    annee_realisation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url_projet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Projet;
};

const {DataTypes} = require("sequelize")

module.exports =  (sequelize) => {
  const Experience = sequelize.define("experience", {
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
    employeur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poste: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    adresse_entreprise: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Experience;
};

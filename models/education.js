const {DataTypes} = require("sequelize")

module.exports =  (sequelize) => {
  const Education = sequelize.define("education", {
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
    nom_ecole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diplome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    ville_ecole: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Education;
};

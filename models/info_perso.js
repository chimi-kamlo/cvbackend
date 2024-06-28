const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  const Info_perso = sequelize.define("info_perso", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationalite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        isEmail: {
          msg: " votre adresse email invalide",
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Info_perso;
};

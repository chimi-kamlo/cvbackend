const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  const Certification = sequelize.define("certification", {
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
    intitule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    centre_formation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Certification;
};

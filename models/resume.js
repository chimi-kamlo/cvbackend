const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  const Resume = sequelize.define("resume", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Resume;
};

const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
  const Template = sequelize.define("template", {
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
    templateId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
  return Template;
};

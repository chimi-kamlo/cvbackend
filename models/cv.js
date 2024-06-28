const {DataTypes} = require("sequelize")

module.exports =  (sequelize) => {
  const cv = sequelize.define("cvs", {
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
    path:{
      type:DataTypes.STRING(255),
      allowNull:false,
    },
    
    docxPath:{
      type:DataTypes.STRING(255),
      allowNull:false,
    },
    date_creation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
  });
  return cv;
};

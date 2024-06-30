const {DataTypes} = require("sequelize")

module.exports =  (sequelize) => {
  const Diologue = sequelize.define("dialogue", {
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
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reponse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_reponse: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_question:{
        type: DataTypes.DATE,
        allowNull: false,
        
    },
intitule:{
  type:DataTypes.STRING,
  allowNull: false,

}
    
  });
  return Diologue;
};

const {DataTypes} = require("sequelize")
module.exports =  (sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "le numero de telephone doit etre unique",
      },
      required: {
        msg: "le champ telephone est requis",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "le password doit etre unique",
      },
      required: {
        msg: "le champ password est requis",
      },
    },
  });
  return Users;
};

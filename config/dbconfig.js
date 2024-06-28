
const Sequelize = require("sequelize")
const config = require("dotenv").config();

//**** connexion a la bd */
const sequelize = new Sequelize(
  "curriculum",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false // Désactive les timestamps pour tous les modèles
    }
  }
);

//**mise en place des relation */

const db = {};
db.sequelize = sequelize;
db.Users = require("../models/users")(sequelize);
db.Info_perso = require("../models/info_perso")(sequelize);
db.Education = require("../models/education")(sequelize);
db.Competence = require("../models/competence")(sequelize);
db.Loisir = require("../models/loisir")(sequelize);
db.Langue = require("../models/langue")(sequelize);
db.Experience = require("../models/experience")(sequelize);
db.Resume = require("../models/resume")(sequelize);
db.Projet = require("../models/projet")(sequelize);
db.Certification = require("../models/certification")(sequelize);
db.Dialogue = require("../models/dialogue")(sequelize);
db.CV = require("../models/cv")(sequelize);
db.Template = require("../models/template")(sequelize)
db.Test = require("../models/test")(sequelize);


//**definition des assasiations */

// 1.assosiation un-à-plusieurs entre la table projet et la table users
db.Users.hasMany(db.Projet, { foreignKey: "userId", onDelete: "CASCADE" });
db.Projet.belongsTo(db.Users ,{foreignKey:"userId"});

// 2.assosiation un-à-plusieurs entre la table experience et la table users
db.Users.hasMany(db.Experience, { foreignKey: "userId", onDelete: "CASCADE" });
db.Experience.belongsTo(db.Users ,{foreignKey:"userId"});

// 3.assosiation un-à-plusieurs entre la table certification et la table users
db.Users.hasMany(db.Certification, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.Certification.belongsTo(db.Users,{foreignKey:"userId"});

// 4.assosiation un-à-plusieurs entre la table loisir et la table users
db.Users.hasMany(db.Loisir, { foreignKey: "userId", onDelete: "CASCADE" });
db.Loisir.belongsTo(db.Users ,{foreignKey:"userId"});

// 5.assosiation un-à-plusieurs entre la table langue et la table users
db.Users.hasMany(db.Langue, { foreignKey: "userId", onDelete: "CASCADE" });
db.Langue.belongsTo(db.Users ,{foreignKey:"userId"});

// 6.assosiation un-à-plusieurs entre la table resume et la table users
db.Users.hasMany(db.Resume, { foreignKey: "userId", onDelete: "CASCADE" });
db.Resume.belongsTo(db.Users ,{foreignKey:"userId"});

// 7.assosiation un-à-plusieurs entre la table competence et la table users
db.Users.hasMany(db.Competence, { foreignKey: "userId", onDelete: "CASCADE" });
db.Competence.belongsTo(db.Users ,{foreignKey:"userId"});

// 8.assosiation un-à-plusieurs entre la table education et la table users
db.Users.hasMany(db.Education, { foreignKey: "userId", onDelete: "CASCADE" });
db.Education.belongsTo(db.Users ,{foreignKey:"userId"});

// 9.assosiation un-à-un  entre la table info_perso et la table users
db.Users.hasOne(db.Info_perso, { foreignKey: "userId", onDelete: "CASCADE" });
db.Info_perso.belongsTo(db.Users ,{foreignKey:"userId"});

// 10 assosiation un-à-un  entre la table template et la table users
db.Users.hasOne(db.Template, { foreignKey: "userId", onDelete: "CASCADE" });
db.Info_perso.belongsTo(db.Users ,{foreignKey:"userId"});

// 11.assosiation un-à-plusieurs entre la table dialogue et la table users
db.Users.hasMany(db.Dialogue, { foreignKey: "userId", onDelete: "CASCADE" });
db.Dialogue.belongsTo(db.Users ,{foreignKey:"userId"});

db.Users.hasMany(db.Test, { foreignKey: "userId", onDelete: "CASCADE" });
db.Test.belongsTo(db.Users ,{foreignKey:"userId"});

//**** synchronisation */

sequelize.sync({ alter: true });
console.log("All models were synchronized successfully.");

module.exports=db

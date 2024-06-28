
const bcrypt = require("bcrypt")

const db = require("../config/dbconfig");
const { where } = require("sequelize");

const Users = db.Users;

//**creation des utilisateurs */

exports.UserInscription = async  (req, res) =>{
  const { telephone, password } = req.body;
  if (!telephone || !password) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**recuperation d'un utilisateur */
    let user = await Users.findOne({ where: { telephone: telephone } });

    if (user != null) {
      return res.status(409).json({
        message: "le numero de telephone existe deja changer s'il vous plait",
      });
    }
    //**harchage du mot de passe */
    let hash = await bcrypt.hash(password, 10);
    req.body.password = hash;

    //**creation de l'utilisateur */
    let inscrit = await Users.create(req.body);

    return res.status(200).json({ message: "utilisateur enregistre avec succe", data: inscrit });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" ,error:error.message  });
    }
    console.log(error)
    return res.status(500).json({ message: "server error",error:error.message });
  }
}

//** recuperation d'un utilisateur */
exports.getUser = async (req, res)=> {
  const user_telephone = req.params.telephone;
  if (!user_telephone) {
    return res.status(400).json({ message: "l'identifiant est requis" });
  }
  
  try {
    let user = await Users.findOne({
      where: { telephone: user_telephone },
      include: [
        {
          model: db.Certification,
          attributes: { exclude: ['userId'] },
        },
        {
          model: db.Competence,
          attributes: { exclude: ['userId'] },
        },
        {
          model:  db.Education,
          attributes: { exclude: ['userId'] },
        },
        {
          model: db.Experience,
          attributes: { exclude: ['userId'] },
        },
        {
          model: db.Info_perso,
          attributes: { exclude: ['userId'] },
        },
        {
          model:     db.Langue,
          attributes: { exclude: ['userId'] },
        },
       
        {
          model: db.Loisir,
          attributes: { exclude: ['userId'] },
        },
       
        {
          model: db.Projet,
          attributes: { exclude: ['userId'] },
        },
        {
          model: db.Resume,
          attributes: { exclude: ['userId'] },
        },
       
      ],
    });
    if (!user) {
      const message = "l'utilisateur n'existe pas";
      return res.status(404).json({ message });
    }
    return res.json({ message: "Utilisateur récupéré avec succès", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "database error", error: error.name });
  }
}




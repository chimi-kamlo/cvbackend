const { where } = require("sequelize");
const db = require("../config/dbconfig")
const Info_perso = db.Info_perso;

const multer = require('multer');
//** 1. create users */

exports.createUser= async (req, res) =>{
  const utilisateur = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    profession: req.body.profession,
    sexe: req.body.sexe,
    date_naissance: req.body.date_naissance,
    nationalite: req.body.nationalite,
    email: req.body.email,
    adresse: req.body.adresse,
  };

  if (
    !utilisateur.nom ||
    !utilisateur.prenom ||
    !utilisateur.profession ||
    !utilisateur.sexe ||
    !utilisateur.date_naissance ||
    !utilisateur.nationalite ||
    !utilisateur.email ||
    !utilisateur.adresse
  ) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**recuperation d'un utilisateur */
    let user = await Info_perso.findOne({
      where: { email: utilisateur.email },
    });

    if (user != null) {
      return res.status(409).json({
        message: "cette email existe deja changer s'il vous plait",
      });
    }
 let test = await Info_perso.findOne({where:{userId:req.id}})

 if (test != null) {
  return res.status(409).json({
    message: "Cet utilisateur a déjà enregistré ses informations personnelles",
  });
}
    //**creation de l'utilisateur */
    let users = await Info_perso.create({...req.body,userId:req.id,image: req.file ? req.file.path : null});

    return res.status(200).json({ message: "utilisateur crée", data: users });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" });
    }
    return res.status(500).json({ message: "Hash error" });
  }
}

//**2. Upload Image Controller//

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({storage: storage}).single("image");


// Route de mise à jour des informations personnelles

exports.updateInfo_perso = async (req, res) => {
  const infoId = req.params.id;
  const updateData = req.body;
  console.log(req.body)
  try {
    if (req.file) {
      updateData.image = req.file.path; 
  }
      const info = await db.Info_perso.findOne({where:{userId:infoId}});

      if (!info) {
          return res.status(404).json({ message: 'user not found' });
      }

      // Mettre à jour les champs
      await info.update(updateData);
      

      res.status(200).send({ message: 'succes', info });
  } catch (error) {
      console.error('erreur lors de la modification:', error);
      res.status(500).send({ message: 'Server error', error });
  }
};

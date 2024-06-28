const db = require("../config/dbconfig")
const Projet = db.Projet;

//**enregistrement d'un projet */

exports.createProjet = async(req, res)=> {
  const { entreprise, nom_projet, annee_realisation } = req.body;
  if (!entreprise || !nom_projet || !annee_realisation) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**enregistrement  */
    let projet = await Projet.create({...req.body,userId:req.id});

    return res.json({ message: "utilisateur crée", data: projet });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" });
    }
    return res.status(500).json({ message: error.name });
  }
}

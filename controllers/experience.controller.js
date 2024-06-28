const db = require("../config/dbconfig")
const Experience = db.Experience;

//**enregistrement d'une experience */

exports.createExperience = async (req, res)=> {
  const {
    employeur,
    poste,
    date_debut,
    date_fin,
    adresse_entreprise,
    description,
  } = req.body;
  if (!employeur || !poste || !date_debut || !date_fin) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**enregistrement  */
    let experience = await Experience.create({...req.body,userId:req.id});

    return res.status(200).json({ message: "utilisateur crée", data: experience });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" });
    }
    return res.status(500).json({ message: error.name });
  }
}

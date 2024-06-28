
const db = require("../config/dbconfig")
const Competence = db.Competence;
//**creation des utilisateurs */

exports.createCompetence =  async  (req, res)=> {
  const {  nom_competence } = req.body;
  if (!nom_competence) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**enregistrement  */
    let competence = await Competence.create({...req.body,userId:req.id});

    return res.status(200).json({ message: " competence enregistré avec succes", data: competence });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" });
    }
    return res.status(500).json({ message: "Hash error" });
  }
}

const db = require("../config/dbconfig")
const Langue = db.Langue;
//**creation des utilisateurs */

exports.createLangue = async  (req, res) =>{
  const { pourcentage, langue } = req.body;
  if (!langue || !pourcentage) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**enregistrement  */
    let langue = await Langue.create({...req.body,userId:req.id});

    return res.status(200).json({ message: "langue enregistre avec succes ", data: langue });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" });
    }
    return res.status(500).json({ message: "Hash error" });
  }
}

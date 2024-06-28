
const db = require("../config/dbconfig")
const Certification = db.Certification;
//**creation des utilisateurs */

exports.createCertification = async (req, res)=> {
  const { intitule, centre_formation, date } = req.body;
    
  if (!intitule || !centre_formation || !date) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**enregistrement  */
    let certifica = await Certification.create({...req.body,userId:req.id});

    return res.status(200).json({ message: "certification enregistré", data: certifica });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" });
    }
    return res.status(500).json({ message: "Hash error" });
  }
}

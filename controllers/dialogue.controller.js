const db = require("../config/dbconfig")
const Dialogue = db.Dialogue;



exports.createDialogue = async (req, res) =>{
  const {
    question,reponse,links, date_reponse, date_question
  } = req.body;
  if (!question || !reponse || !links || !date_reponse|| !date_question) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {

    let dialogue = await Dialogue.create( {...req.body,userId:req.id});

    return res.status(200).json({ message: "vous avez bien enregistré un dialogue", data: dialogue });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" ,error: error.message});
    }
    return console.log(error)
  }
}


//** recuperation d'un dialogue */

exports.getDialogue= async(req, res) =>{
  const id_user = req.params.userId;
  if (!id_user) {
    return res.status(400).json({ message: "l'identifiant est requis" });
  }
  try {
    let dialogue = await Dialogue.findOne({
      where: { userId:id_user  }
    });
    if (!dialogue) {
      
      return res.status(404).json({ message:"il n'y a aucun dialogue corespondant a cet utilisateur" });
    }
    return res.json({ message: " information relative au dialogue entre l'utilisateur et l'IA", data: dialogue });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "database error", error: error.message });
  }
}

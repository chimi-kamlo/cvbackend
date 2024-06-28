const bcrypt = require("bcrypt");
const db = require("../config/dbconfig");
const jwt = require("jsonwebtoken");
const Users = db.Users;


exports.UserLogin = async (req, res) => {
  const { telephone, password } = req.body;

  if (!telephone || !password) {
    return res
      .status(400)
      .json({ message: "rassuré vous d'avoir remplir tous les champs" });
  }
  try {
    //**recuperation d'un utilisateur */

    let inscrit = await Users.findOne({
      where: { telephone: telephone },
      
    });

   

    //**verification de la presence de l'utilisateur */

    if (inscrit == null) {
      return res.status(404).json({ message: "l'utilisateur n'existe pas" });

    }


   

    //**verification  du mot de passe de l'utilisateur */

    let test = await bcrypt.compare(password, inscrit.password);

   
    //**vification du cryptage du mot de passe */

    if (!test) {
      return res.status(409).json({ message: "password incorrect" });
    }

    //****generation du token jwt//
    const  user = {
      id: inscrit.id,
      telephone: inscrit.telephone,
    }
    const token = jwt.sign(
      user
      ,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_DURING,
      }
    );
      
    let info = await db.Info_perso.findOne({ where: { userId: inscrit.id },
      attributes: [ 'nom', 'prenom', 'email', 'profession','sexe','nationalite','date_naissance','adresse','userId']
    })

    if(info !=null){

      inscrit = {...inscrit.dataValues,...info.dataValues}
    }
   
    
       
    return res.status(200).json({ acces_token: token, data: inscrit });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      console.log(error)
      return res.status(500).json({ message: "database error" });
    }
    return res.status(500).json({
      message: "l'authentification a echouée",
      error: console.log(error),
    });
  }
};

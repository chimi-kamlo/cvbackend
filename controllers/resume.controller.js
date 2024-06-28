const db = require("../config/dbconfig")
const Resume = db.Resume;
const User = db.Users
 const  {formatCompetence,formatEducation,formatExperience,formatCertification} = require("../utils")
//** enregistrement d'un resume */

exports.createResume = async (req, res)=> {
  const { resume } = req.body;
  
  // recuperation des information de l'utilisateur courant en base de donnees
  let user = await User.findOne({
    where: { id:req.id },
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
     
    ],
  });
   // destructuration des information de l'utilisateur dans des variables
  let user_final = {certifications,competences,education,experiences} = user

  //fonction qui permet de faire le formatage du prompt pour l'IA
  const formatage = (certifications,competences,education,experiences)=>{
      certificats = formatCertification(certifications)
       competences =  formatCompetence(competences)
       educations =  formatEducation(education) 
       experiences =  formatExperience(experiences)

       return ` a parti de mes information suivante es ce que tu peux fait une breve presentation de moi pour que je puise mettre dans mon cv:${educations} , ${competences},${experiences},${certificats} ` 

  }
  //  console.log(JSON.stringify(education, null, 2))
  console.log( formatage(certifications,competences,education,experiences))
  setTimeout( async () =>{
  try {
    //**enregistrement  */
    
    let resumes = await Resume.create({...req.body,userId:req.id});
    
    
    return res.status(200).json({ message: "resume OK", data: resumes ,user_info:user_final});
 
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      // return res.status(500).json({ message: "database error" , error:error.name});
      console.log(error)
    }
    // return res.status(500).json({message: "database error" , message: error.name });
    console.log(error)
  }
},2000)
}

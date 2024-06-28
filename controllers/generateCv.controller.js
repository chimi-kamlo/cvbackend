const axios = require('axios');
const db = require("../config/dbconfig")
const Dialogue = db.Dialogue;
const Users = db.Users
const pdf = require("pdf-creator-node")
const fs = require("fs")
const {formatCompetence,storePDFInDatabase} = require("../utils")




const {createPDF,compileTemplate} = require("../utils");
const { path } = require('../routes/auth.route');
const { where } = require('sequelize');
exports.generateCvPdf= async (req, res)=> {
  const pdfMonkeyUrl = 'https://api.pdfmonkey.io/api/v1/documents';

  // recuperation des elements envoyes

  const {
    question,reponse, date_reponse, date_question
  } = req.body;

  const configPot = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer GMgyLjRoYQbyBmPpoyku' 
    }
    

  };
  const configGet = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer GMgyLjRoYQbyBmPpoyku' 
      
    }
    
  };

 const datapdf = {
  "document": {
    "document_template_id": req.body.template_id,
    "status":"pending",
    "download_url": true,
    "payload": {
      ...req.body.data
    },
    "meta": {
      "clientId": "ABC1234-DE",
      "_filename": "document.pdf"
    },
   
    
  },
  

}
const meta = {
  "clientId": "ABC1234-DE",
  "_filename": "document.pdf",
  
}
 
if (!question || !reponse ||  !date_reponse|| !date_question) {
  return res
    .status(400)
    .json({ message: "rassuré vous d'avoir remplir tous les champs" });
}
//

// creation d'un document
const result = await axios.post(pdfMonkeyUrl, datapdf, configPot);
const ID = result.data.document.id;
//
// execution apres 2 secondes
setTimeout(async () => {
  try {
      // recuperation des informations sur le document
    const resultfinal = await axios.get(`https://api.pdfmonkey.io/api/v1/document_cards/${ID}`, configGet);
     // enregistrement des informations dans la table dialogue
    let dialogue = await Dialogue.create( {question:question,reponse:reponse,
      date_reponse:date_reponse,date_question:date_question,userId:req.id,links:resultfinal.data.document_card.download_url});
   
     
    return res.status(200).json({ message: "CV généré avec succès",url:resultfinal.data.document_card.download_url,data:dialogue});
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" ,error: error.message});
    }
    
    return res.status(500).json({message:"server error",error:error.message})
    
  }
}, 2000);


}

// endpoint qui permet de proposer un plan de carrier a l'utilisateur

exports.UserPlanDeCarriere = async  (req, res) =>{
  const { message } = req.body;
  if (!message) {
    return res
      .status(400)
      .json({ message: "Assurez-vous d'avoir envoyé l'information attendue." });
  }
   // recuperation d'un utilisateur en base de donnees
  let user = await Users.findOne({
    where: { id:req.id },
    include: [
      {
        model: db.Competence,
        attributes: { exclude: ['userId'] },
      },]})
    const user_info= {competences} = user
      // formatage du message pour envoyer a l'IA
      const format = (competences)=>{
          const competence = formatCompetence(competences)
         return ` Étant donné que je suis un informaticien qui aimerait évoluer dans: ${message}, en tenant compte de mes compétences suivantes : ${competence}, est-ce que tu peux me faire une proposition de plan de carrière ou une proposition de certification à faire ou d'aptitudes à ajouter ?`
      }
    console.log(format(competences))
  try {
    //**recuperation d'un utilisateur */
    

    if (user == null) {
      return res.status(409).json({
        message: "l'utilisateur n'existe pas",
      });
    }
   

    //**creation de l'utilisateur */
    // let inscrit = await Users.create(req.body);

    return res.status(200).json({ message: message, data: user });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" ,error:error.message  });
    }
    console.log(error)
    return res.status(500).json({ message: "server error",error:error.message });
  }
}


// endpoint qui permet de proposer un plan de carrier a l'utilisateur

exports.UserPlusCompetence = async  (req, res) =>{
  
   // recuperation d'un utilisateur en base de donnees
  let user = await Users.findOne({
    where: { id:req.id },
    include: [
      {
        model: db.Competence,
        attributes: { exclude: ['userId'] },

      },]})

       //**recuperation d'un utilisateur */
      if (user == null) {
      return res.status(409).json({
        message: "l'utilisateur n'existe pas",
      });
    }
   
    const user_info= {competences} = user
      // formatage du message pour envoyer a l'IA
      const format = (competences)=>{
        let dateActuelle = new Date();
          const competence = formatCompetence(competences)
         return `Étant donné un informaticien en : ${dateActuelle.getFullYear()}, qui possède les compétences suivantes : ${competence}, quelles autres compétences lui recommanderais-tu pour améliorer son expertise dans son domaine ?`
      }
    console.log(format(competences))
  try {
   
    return res.status(200).json({ message: message, data: user });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      return res.status(500).json({ message: "database error" ,error:error.message  });
    }
    console.log(error)
    return res.status(500).json({ message: "server error",error:error.message });
  }
}


// endpoint pour la creation d'un cv pour nos utilisateurs en fonction d'un job description

exports.UserCvJobDescription = async  (req, res) =>{
  
  // recuperation d'un utilisateur en base de donnees
  const {jod_description} = req.body
  if (!jod_description) {
    return res
      .status(400)
      .json({ message: "Assurez-vous d'avoir envoyé les informations demandees." });
  }
  let user = await Users.findOne({
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
        model: db.Resume,
        attributes: { exclude: ['userId'] },
      },
     
    ],
  });
  if (user == null) {
    return res.status(409).json({
      message: "l'utilisateur n'existe pas",
    });
  }
  //  const user_info= {competences} = user
  //    // formatage du message pour envoyer a l'IA
  //    const format = (competences)=>{
  //      let dateActuelle = new Date();
  //        const competence = formatCompetence(competences)
  //       return `Étant donné un informaticien en : ${dateActuelle.getFullYear()}, qui possède les compétences suivantes : ${competence}, quelles autres compétences lui recommanderais-tu pour améliorer son expertise dans son domaine ?`
  //    }
  //  console.log(format(competences))
 try {

   return res.status(200).json({ message:"cv", data: user });
 } catch (error) {
   if (error.name === "SequelizeDatabaseError") {
     return res.status(500).json({ message: "database error" ,error:error.message  });
   }
   console.log(error)
   return res.status(500).json({ message: "server error",error:error.message });
 }
}


//recuperation des cv d'un utilisateur

exports.getcv = async (req,res)=>{
   
  try{

    const cvs = await db.CV.findAll({where:{userId:req.id},attributes: { exclude: ['data'] }})
    if(cvs!=null){
    return  res.status(200).json({ "message":"succes","data": cvs})
    }
  
   return res.status(404).json({"Message" : "Aucun CV pour cet utilisateur."})

  }catch(error){
    return res
    .status(500)
    .json({ message: "database error", error: error.name });
}
  }
   
  exports.pdfcv = async (req,res)=>{
    
    const options = {
      format: 'A4',
      orientation: 'portrait',
      // border: '10mm',
      
  };
   const html = fs.readFileSync('./public/template1.html', 'utf8');
   const document ={
      html:html,
      data:{
        message:"chimi kamlo "
      },
      path: "./public/output.pdf"
   }
    try{
      
      pdf.create(document, options)
  .then((res) => {
    const pdfContent = fs.readFileSync("./public/output.pdf");
        storePDFInDatabase(pdfContent);
    console.log(res);
  })
    
   return  res.status(200).json({ message: 'CV generated and saved successfully'});
    }catch(error){
      console.log(error)
     return  res.status(500).json({ message: 'An error occurred while generating the CV.', error });
    }
  }

  exports.showCv=  async (req, res) => {
    try {
        // Récupération du PDF en base de données à partir de l'ID
        const pdf = await db.CV.findByPk(req.params.id);
        console.log(pdf.data)
        if (!pdf) {
            // Si le PDF n'est pas trouvé, retourner une erreur 404
            return res.status(404).send('PDF non trouvé');
        }
        // Définir les en-têtes HTTP pour indiquer que le fichier est un PDF
        res.setHeader('Content-Type', 'application/pdf');
        // Indiquer que le fichier doit être téléchargé avec le nom 'document.pdf'
        res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
        // Envoyer le contenu du PDF au client
        console.log(pdf.data)
        res.end(pdf.data);
    } catch (error) {
        // Gérer les erreurs et renvoyer une erreur 500 en cas de problème serveur
        console.error('Erreur lors de la récupération du PDF :', error);
       return  res.status(500).json({"message":'Erreur serveur'});
    }
};

exports.getAll = async (req,res)=>{
      try{
        const userCv = await db.CV.findAll({where:{userId:req.id}})
       if(userCv==null){
        return res.status(204).json({message:"aucun cv pour cet utilisateur"})
       }    

       return res.status(200).json({"message":"liste des cvs",data:userCv})
      }catch(error){
        return  res.status(500).json({"message":'Erreur serveur'});
      }

}
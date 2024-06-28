const express = require("express") ;
const app = express();
const port = process.env.PORT ;
const cors = require("cors") ;
const bodyParser = require("body-parser");
const db= require("./config/dbconfig")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const axios = require("axios")
const User = db.Users
const fs = require('fs'); 
const handlebars = require('handlebars');
const { v4: uuidv4 } = require('uuid');
const pdf = require("pdf-creator-node")
const htmlDocx = require('html-docx-js');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

const  {formatCompetence,storePDFInDatabase,formatEducation,formatExperience,formatCertification,formatLangues,formatResume,formatLoisir,formatPerso,blobToBuffer} = require("./utils")
// socket.io

var server = require('http').Server(app);
var io = require('socket.io')(server);

//socket.io

const checktokenmaddleware = require("./jesonwebtoken/check")

// Utilisation de express.json() pour analyser les corps de requête JSON
app.use(bodyParser.json());
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

//** importation des routes */

const auth_router = require("./routes/auth.route") ;
const users_route = require("./routes/users.route") ;
const info_perso_route = require("./routes/info_perso.route") ;
const education_route = require("./routes/education.route");
const competence_route = require("./routes/competence.route") ;
const loisir_route = require("./routes/loisir.route") ;
const langue_route = require("./routes/langue.route") ;
const experience_route = require("./routes/experience.route") ;
const resume_route = require("./routes/resume.route");
const projet_route = require("./routes/projet.route");
const certification_route = require("./routes/certification.route");
const dialogue_route = require("./routes/dialogue.route");
const template_route = require("./routes/template.route");



const  genereteCV_route = require("./routes/generateCV.route");
const { where } = require("sequelize");
const resume = require("./models/resume");

//**mise en place du routage */



app.use("/auth", auth_router);
app.use("/inscription", users_route);
app.use("/perso",checktokenmaddleware, info_perso_route);
app.use("/education",checktokenmaddleware, education_route);
app.use("/competence",checktokenmaddleware, competence_route);
app.use("/loisir",checktokenmaddleware, loisir_route);
app.use("/langue",checktokenmaddleware, langue_route);
app.use("/experience",checktokenmaddleware, experience_route);
app.use("/resume",checktokenmaddleware, resume_route);
app.use("/projet",checktokenmaddleware, projet_route);
app.use("/certification",checktokenmaddleware, certification_route);
app.use("/dialogue",checktokenmaddleware, dialogue_route)
app.use("/generatecv",checktokenmaddleware, genereteCV_route);
app.use("/template", checktokenmaddleware , template_route);

// mise en place de la documentation swagger



const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API POUR LA  GENERETION DE CV',
    version: '1.0.0',
    description:
    "C'est une REST API faite avec Express permettant d'enregistrer les informations de l'utilisateur en base de données dans le cadre d'une application de génération de CV"
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'serveur de developpement',
    },
  ],

  
};

const options = {
  swaggerDefinition,
  // chemin vers mes routes 
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  fin de la mise en place de la documentation swagger...


// mise en place de socket.io pour une communication bidirectionnelle

io.on('connection',  function(socket){
   
  
  
  //******************************** Génération du résumé*****************/ 

 socket.on('resumeClientEvent', async function(data) {
    //data
    console.log("salut")
   let user = await User.findOne({
    where: { id:data },
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

 // recuperation de la profession d'un utilisateur

 const profession = await db.Info_perso.findOne({
  where: {
    userId:data.user
  },
  attributes: ['profession']
})

//fonction qui permet de faire le formatage du prompt pour l'IA
const formatage = (certifications,competences,education,experiences)=>{
  certificats = formatCertification(certifications)
   competences =  formatCompetence(competences)
   educations =  formatEducation(education) 
   experiences =  formatExperience(experiences)
   // ${educations} ,${experiences},${certificats}
   return ` Étant donné mes compétences suivantes: ${competences},${educations},${experiences},${certificats} es ce que tu peux faire une bref presentation de moi , J'ai une solide expérience en tantque  ${profession.dataValues.profession},ainsi qu'une passion pour l'innovation. J'aimerais une présentation qui mette en valeur mes compétences, mon expérience et ma motivation à relever de nouveaux défis , rédige une présentation cohérente et attrayante , je veux sa en un seul paragraphe,Je préfère une approche naturelle, sans poésie, utilise uniquement les competences que je te donne n'augmente rien, et une seul version en un seul bloc.`
   
}


// appelle de la fonction qui permet de faire le formatage du prompt pour l'IA
const resultat = formatage(certifications,competences,education,experiences)
const datas = async () => {
  try {
   const response = await axios.post(' https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key= AIzaSyCJKdylpxbw14hTo86p4XFi4gjP-vTBxRs'
   , {
     "contents": [{
       "parts":[{
         "text": resultat
       }]}]}
   
    );
   

    return response;
 } catch (error) {
   console.error("Erreur lors de la requête:", error);
   throw error; // Vous pouvez gérer l'erreur ici ou la propager
  }
};
const dateQuestion = new Date();
(async () => {
 try {
   const response = await datas();
   //console.log("Réponse de la requête:",  JSON.stringify(response.data.candidates[0].content.parts[0].text, null, 2));
  
  
  const  donnees =  response.data.candidates[0].content.parts[0].text
const dateReponse = new Date();
     db.Dialogue.create({userId:data,question:resultat,reponse:donnees ,date_reponse:dateReponse,date_question:dateQuestion,intitule:"reume"})
    
    const resume = await db.Resume.create({resume:donnees ,userId:data})
  socket.emit('resumeEvent',donnees)
   
   console.log("succes")
 } catch (error) {
   console.error("Erreur lors de l'utilisation de la fonction:", error);
 }
})();


 });

  //********************************* Génération du plan de carrière.******************/ 


 socket.on('planClientEvent', async(data)=>{
 
  let user = await User.findOne({
    where: { id:data.userId },
    include: [
      {
        model: db.Competence,
        attributes: { exclude: ['userId'] },
      },]})
    const user_info= {competences} = user
    const message = data.domaine
    // recuperation de la profession d'un utilisateur
 const profession = await db.Info_perso.findOne({
  where: {
    userId:data.userId
  },
   attributes: ['profession']
 })
        
    // formatage du message pour envoyer a l'IA
    const format = (competences)=>{
      const competence = formatCompetence(competences)
     return ` Étant donné que je suis ${profession.dataValues.profession} et que j'aimerait évoluer dans: ${data.domaine}, en tenant compte de mes compétences suivantes : ${competence}, est-ce que tu peux me faire une proposition de plan de carrière ou une proposition de certification a faire donne moi la reponse sous forme json a l'interieur du json il doit avoir un tableau d'objet json le tableau doit toujours  avoir le nom:plan_carrier et chaque objet doit toujours avoir les attribut suivant: poste,description,competence_requises et ils doivent toujours etre en minuscul et en francais. entre un peu plus en profondeur au niveau de la description et des competence_requises les attributs  competence_requises et competence_requises doivent toujours etre des tableaux met aussi un attribut appele:centre_formation ou tu donne les lieu de formation en ligne.ajoute aussi un attribut certification ou tu donne des certification si possible a faire je ne veux plus le mot json au debut et ne met plus de  backtick au debut et a la fin de la reponse je repete ne met plus jamais  de backtick au debut et a la fin de la reponse`
      
  }
   const resultat = format(competences)
    // console.log(resultat)
   //communication avec l'IA

   const datas = async () => {
       try {
        const response = await axios.post(' https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key= AIzaSyCJKdylpxbw14hTo86p4XFi4gjP-vTBxRs'
        , {
          "contents": [{
            "parts":[{
              "text": resultat
            }]}]}
        
         );
        
    
         return response;
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
        throw error; // Vous pouvez gérer l'erreur ici ou la propager
       }
     };
     const dateQuestion = new Date();
     (async () => {
      try {
        const response = await datas();
        //console.log("Réponse de la requête:",  JSON.stringify(response.data.candidates[0].content.parts[0].text, null, 2));
        // const donnees = response.data.choices[0].message.content
       
       const  donnees =  response.data.candidates[0].content.parts[0].text
      const dateReponse = new Date();
      //const donneesParse = JSON.parse(donnees)
      db.Dialogue.create({userId:data.userId,question:resultat,reponse:donnees ,date_reponse:dateReponse,date_question:dateQuestion,intitule:"plan de carrière"})
    
       socket.emit('planEvent',donnees)
        // Faites ce que vous voulez avec la réponse ici
      } catch (error) {
        console.error("Erreur lors de l'utilisation de la fonction:", error);
      }
    })();
    
})

//*********************** suggestion des competences************ */ 

socket.on('CompetenceSuggestionClientEvent',async (data)=>{
    
  let user = await User.findOne({
    where: { id:data.userId},
    include: [
      {
        model: db.Competence,
        attributes: { exclude: ['userId'] },

      },]})

      const user_info= {competences} = user
      // formatage du message pour envoyer a l'IA
      const format = (competences)=>{
        let dateActuelle = new Date();
          const competence = formatCompetence(competences)
         return `Étant donné un informaticien en : ${dateActuelle.getFullYear()}, qui possède les compétences suivantes : ${competence}, quelles autres compétences lui recommanderais-tu pour améliorer son expertise dans son domaine ,donne une reponse vraiment detailler ainsi que les lieu de formation? donne une justificaton pour chaque suggestion puis qu'il faut savoir pourquoi faire tel chose ou tel autre chose donne moi toujours la reponse sous forme json a l'interieur il   doit toujours avoir un tableau d'objet json exploitable ce tableau doit toujours s'appele :competence ,chaque objet doit toujours avoir uniquement les champ suivant: nom_competence,justification,lieu_formation.lieu_formation doit toujours etre un tableau d'element text , Pour plus d'éclaircissements au niveau de la justification, plonge un peu plus en profondeur et sois convaincant. ne met jamais le mot json au debut de la reponse et je me jamais les backticks au debut et a la fin de la reponse je repete ne met jamais les backticks au debut et a la fin de la reponse`
      }
     //communication avec l'IA
     const resultat = format(competences);
   const datas = async () => {
    try {
     const response = await axios.post(' https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key= AIzaSyCJKdylpxbw14hTo86p4XFi4gjP-vTBxRs'
     , {
       "contents": [{
         "parts":[{
           "text": resultat
         }]}]}
     
      );
     
         
      return response;
   } catch (error) {
     console.error("Erreur lors de la requête:", error);
     throw error; // Vous pouvez gérer l'erreur ici ou la propager
    }
  };
  const dateQuestion = new Date();
  (async () => {
   try {
     const response = await datas();
     //console.log("Réponse de la requête:",  JSON.stringify(response.data.candidates[0].content.parts[0].text, null, 2));
    
    
    const  donnees =  response.data.candidates[0].content.parts[0].text
    const dateReponse = new Date();
    const donneesParse = JSON.parse(donnees)
    db.Dialogue.create({userId:data.userId,question:resultat,reponse:donneesParse ,date_reponse:dateReponse,date_question:dateQuestion,intitule:"competences"})
    socket.emit('CompetenceSuggestionEvent',donnees)
     // Faites ce que vous voulez avec la réponse ici
   } catch (error) {
     console.error("Erreur lors de l'utilisation de la fonction:", error);
   }
 })();

})

// *******************generation d'un cv**************************

// socket.on('cvClientEvent', async(data)=>{
  
//   let user = await User.findOne({
//     where: { id:data.userId },
//     include: [
//       {
//         model: db.Certification,
//         attributes: { exclude: ['userId'] },
//       },
//       {
//         model: db.Competence,
//         attributes: { exclude: ['userId'] },
//       },
//       {
//         model:  db.Education,
//         attributes: { exclude: ['userId'] },
//       },
//       {
//         model: db.Experience,
//         attributes: { exclude: ['userId'] },
//       },
//       {
//         model: db.Info_perso,
//         attributes: { exclude: ['userId'] },
//       },
//       {
//         model:     db.Langue,
//         attributes: { exclude: ['userId'] },
//       },
     
//       {
//         model: db.Loisir,
//         attributes: { exclude: ['userId'] },
//       },
//       {
//         model: db.Resume,
//         attributes: { exclude: ['userId'] },
//       },
     
//     ],
//   });
//   console.log( JSON.stringify(user))
//   console.log(user.id)
//   let user_final = {certifications,competences,education,experiences, info_persos, langues,loisirs,resumes} = user
    
//     console.log(user.info_perso)
//   let formatage = (info_perso= user.info_perso, certifications = user.certifications,competences=user.competences,education = user.education,experiences=user.experiences,langues=user.langues,loisirs=user.loisirs,resumes = user.resumes )=>{
//     let certificats = formatCertification(certifications)
//     let competence =  formatCompetence(competences)
//     let educations =  formatEducation(education) 
//    let  experience =  formatExperience(experiences)
//     let langue = formatLangues(langues)
//     let resume = formatResume(resumes)
//     let  loisir = formatLoisir(loisirs)
    
   
//      return ` en tenant compte de mes informations suivantes: nom=${user.info_perso.nom},prenom=${user.info_perso.prenom},profession=${user.info_perso.profession},email=${user.info_perso.email},adresse=${user.info_perso.adresse} telephone=${user.telephone},sexe=${user.info_perso.sexe} date_naissance=${user.info_perso.date_naissance} , ${resume},${educations},${certificats},${competence},${experience},${langue},${loisir} produire moi un cv avec les differebtes section que je t'ai fournir.le cv  genere doit etre specifique au jod description suivant:${data.jobDescription} produire uniquement en focntion de mes information d'augmente rien rasur toi juste qu'il reponde au attentes de l'offre d'emploie a la fin fait des suggestion detaillées et avec justification de competences a obtenir pour avoir plus de  chance d'etre retenu a cette offre d'emploi bien specifique je veux la reponse sous forme de json  exploitable , pour la section competence je veuxt juste un tableau d'element pas d'objet,pour met toujurs  les information personnel directement dans le json final et non dans une propriete qui les englobe tous  et les langues parlées dans un tableau appele:langues , les proprietes du json doivent toujours etre en minuscul et en français ,met les suggestions doivent toujours etre  dans un tableau d'element  appele:suggestions, ne fait que des suggestion des competences que je n'ai pas ,je ne veux plus le mot json au debut de la reponse et ne met pas de backtick a la fin et au debut de la reponse je repete encore ne met jamais les backtick au debut et a la fin de la reponse l'attribut education doit toujour etre un tableau d'objet et chaque objet doit avoir les proprietes suivante:diplome,ecole,dat. l'attribut loisirs doit toujours etre un tableau d'element. l'attribut experience doit toujours etre un tableau d'objet avec pour propriete:poste,employeur,date_debut,date_fin,description s'il existe egalement localisation s'il existe aussi  NB:ne met plus jamais les informations personnelle dans l'attribut information_personnelle laise directement a la racine du json produit ne met pas d'accent sur le nom des attributs et des proprietes s'il y a plusieur resume tu prend e resume le plus pertinent`
//   }
    
//   resultat =  formatage(certifications,competences,education,experiences,langues,loisirs,resumes)
//   // console.log(resultat)
//   // communication avec l'IA
//   const datas = async () => {
//     try {
//      const response = await axios.post(' https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key= AIzaSyCJKdylpxbw14hTo86p4XFi4gjP-vTBxRs'
//      , {
//        "contents": [{
//          "parts":[{
//            "text": resultat
//          }]}]}
     
//       );
     
 
//       return response;
//    } catch (error) {
//      console.error("Erreur lors de la requête:", error);
//      throw error; // Vous pouvez gérer l'erreur ici ou la propager
//     }
//   };
 
//   (async () => {
//     const pdfMonkeyUrl = 'https://api.pdfmonkey.io/api/v1/documents';
//     const configPot = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer GMgyLjRoYQbyBmPpoyku' 
//       }
//     };
//     const configGet = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer GMgyLjRoYQbyBmPpoyku' 
        
//       }
      
//     };
    
//     const meta = {
//       "clientId": "ABC1234-DE",
//       "_filename": "document.pdf",
      
//     }

   
//    try {
//      const response = await datas();
  
//      const  donnees =  response.data.candidates[0].content.parts[0].text
//      //console.log("Réponse de la requête:",  JSON.stringify(donnees, null, 2));
//      //console.log(donnees)
//      const donneesParse = JSON.parse(donnees)
//        //const templateId = await db.Template({where:{userId:data.user}})
//      const  datapdf = {
//        "document": {
//          "document_template_id":data.ID,
//          "status": "pending",
//          "download_url": true,
//          "payload": donneesParse ,
//          "meta": {
//            "clientId": "ABC1234-DE",
//            "_filename": "document.pdf"
//          },
//        },
//      };
//      console.log("*****************")
    
//     const result = await axios.post(pdfMonkeyUrl, datapdf, configPot,meta);
//     //console.log(result)
    
//     setTimeout(async () => {
//       const ID = result.data.document.id;

      
//    const preview_url =  result.data.document.preview_url
 
//       try {
//           // recuperation des informations sur le document
//         const resultfinal = await axios.get(`https://api.pdfmonkey.io/api/v1/document_cards/${ID}`, configGet);
//          // enregistrement des informations dans la table cv
//          console.log(resultfinal)
//         let dateActuelle = new Date();
//          db.CV.create({userId:data.userId,url_telechargement:resultfinal.data.document_card.download_url,url_visualisation:preview_url,date_creation:dateActuelle})
//          console.log("succes")
//       } catch (error) {
//         if (error.name === "SequelizeDatabaseError") {
//           return res.status(500).json({ message: "database error" ,error: error.message});
//         }
        
//         return res.status(500).json({message:"server error",error:error.message})
        
//       }
//     }, 2000);
 
//     socket.emit('cvEvent',{donnees})
     
//    } catch (error) {
//      console.error("Erreur lors de l'utilisation de la fonction:", error);
//    }
//  })();
// })

//genere cv local template**************************/

   socket.on('cvLocalClientEvent', async (data)=>{

    let user = await User.findOne({
      where: { id:data.userId },
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

   })

    //  let users = JSON.stringify(user)

  let user_final = {certifications,competences,education,experiences, info_perso, langues,loisirs, resumes} = user
   
    //console.log(user.info_perso)
  let formatage = ( certifications ,competences,education ,experiences,langues,loisirs,resumes  )=>{
    let certificats = formatCertification(certifications)
    let competence =  formatCompetence(competences)
    let educations =  formatEducation(education) 
   let  experience =  formatExperience(experiences)
    let langue = formatLangues(langues)
    let resume = formatResume(resumes)
    let  loisir = formatLoisir(loisirs)
    
   
     return ` en tenant compte de mes informations suivantes: nom=${info_perso.nom},prenom=${info_perso.prenom},profession=${info_perso.profession},email=${info_perso.email},adresse=${info_perso.adresse} telephone=${user.telephone},sexe=${info_perso.sexe} date_naissance=${info_perso.date_naissance} , ${resume},${educations},${certificats},${competence},${experience},${langue},${loisir} produire moi un cv avec les differebtes section que je t'ai fournir.le cv  genere doit etre specifique au jod description suivant:${data.jobDescription} produire uniquement en focntion de mes information d'augmente rien rasur toi juste qu'il reponde au attentes de l'offre d'emploie a la fin fait des suggestion detaillées et avec justification de competences a obtenir pour avoir plus de  chance d'etre retenu a cette offre d'emploi bien specifique je veux la reponse sous forme de json  exploitable , pour la section competence je veuxt juste un tableau d'element pas d'objet, met toujurs  les information personnel directement dans le json final et non dans une propriete qui les englobe tous  et les langues parlées dans un tableau appele:langues , les proprietes du json doivent toujours etre en minuscul et en français ,met les suggestions doivent toujours etre  dans un tableau d'element  appele:suggestions, ne fait que des suggestion des competences que je n'ai pas ,je ne veux plus le mot json au debut de la reponse et ne met pas de backtick a la fin et au debut de la reponse je repete encore ne met jamais les backtick au debut et a la fin de la reponse ,l'attribut education doit toujour etre un tableau d'objet et chaque objet doit avoir les proprietes suivante:diplome,ecole,dat. l'attribut loisirs doit toujours etre un tableau d'element. l'attribut experience doit toujours etre un tableau d'objet avec pour propriete:poste,employeur,date_debut,date_fin,description s'il existe egalement localisation s'il existe aussi  NB:ne met plus jamais les informations personnelle dans l'attribut information_personnelle laise directement a la racine du json produit ne met pas d'accent sur le nom des attributs et des proprietes s'il y a plusieur resume tu prend e resume le plus pertinent l'attribut certifications doit toujours s'appele:certifications et sa doit toujours etre un tableau d'objet et chaque objet doit avoir les proprietes suivante: nom,date,etablissement,et description pour les propriete concernant les dates je veux que tu mets toujours les trois premieres lettre du mois 
     suivi de l année  pour la langue n'oublier pas les mot Intermédiaire et courant quant il sont present  `
  }
    
 const  resultat =  formatage(certifications,competences,education,experiences,langues,loisirs,resumes)

  const datas = async () => {
    try {
     const response = await axios.post(' https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key= AIzaSyCJKdylpxbw14hTo86p4XFi4gjP-vTBxRs'
     , {
       "contents": [{
         "parts":[{
           "text": resultat
         }]}]}
     
      );
     
 
      return response;
   } catch (error) {
     console.error("Erreur lors de la requête:", error);
     throw error; // Vous pouvez gérer l'erreur ici ou la propager
    }
  };

  const response = await datas()
  
    
    setTimeout(async ()=>{
      donnees =  response.data.candidates[0].content.parts[0].text
      const donneesParse = JSON.parse(donnees)
      console.log(donneesParse)
      const options = {
        format: 'A4',
        orientation: 'portrait',
        // border: '10mm',
        
    };
   const templateId = await db.Template.findOne({where: { userId:data.userId}})
   
    const templatePath = path.join(__dirname, `./public/${templateId.dataValues.templateId}`);
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template(donneesParse);
    
    let dateActuelle = new Date();
     const document ={
        html:html,
        data: donneesParse,
        path: `./public/output.pdf`
     }
     try{
          
      pdf.create(document, options)
    .then( async(res) => {
            const uniqueName = `${uuidv4()}.pdf`; 
            const finalPath = path.join(__dirname, 'public', uniqueName);
            
    //http://localhost:3000/public/public/b668017d-b4f1-4244-b948-4b812326ab45.docx
    
            const fileUrl = `/public/${uniqueName}`;
    const id = data.userId
    fs.renameSync(document.path, finalPath);

        
        const templat =  path.join(__dirname, './public/template.docx');
      
        const content = fs.readFileSync(
          templat
          ,
          "binary"
      );
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render(
      donneesParse
  );
   
  const buf = doc.getZip().generate({
    type: "nodebuffer",
  
    compression: "DEFLATE",
});
const unique = `${uuidv4()}.docx`; 

  let docxPath = `/public/${unique}`
   fs.writeFileSync(path.resolve(__dirname,'public', unique), buf);

   storePDFInDatabase(id ,fileUrl,docxPath);
   
    })
    socket.emit('localCvEvent',donnees)
     console.log('CV generated and saved successfully');
    }catch(error){
      console.log(error)
      console.log('An error occurred while generating the CV.')
     
    }
    
    },2000)

   })


 //******************* generation du cv apres du web scrping */

//  socket.on("cvScrapingClientEvent", async(data)=>{
//   const response = await axios.get(data.lien);
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const imgElements = $('img');
//   imgElements.each((index, element) => {
//     const src = $(element).attr('src');
//     if (src && src.toLowerCase().includes('logo')) {
//         logoSrc = src;
//        return false
       
//     }
//     console.log(logoSrc)
// });

// if (logoSrc) {
//   // Télécharger le logo
//   const logoFileName = path.basename(logoSrc);
//   const logoPath = path.join(__dirname, 'logos', logoFileName);

//   const logoResponse = await axios.get(logoSrc, { responseType: 'stream' });
//   const logoStream = logoResponse.data.pipe(fs.createWriteStream(logoPath));

//   logoStream.on('finish', async () => {
//       console.log('Logo téléchargé avec succès :', logoPath);

//       // Utiliser Vibrant pour extraire les couleurs du logo
//       const palette = await Vibrant.from(logoPath).getPalette();

//       // Envoyer les couleurs au client
//       socket.emit('cvScraping', {  palette });
//   });

//   logoStream.on('error', (error) => {
//       console.error('Erreur lors du téléchargement du logo :', error);
//       // Envoyer un message d'erreur au client
//       socket.emit('cvScraping', { error: 'Erreur lors du téléchargement du logo' });
//   });
// } else {
//   console.log('Aucun logo trouvé sur la page.');
//   // Envoyer un message au client indiquant qu'aucun logo n'a été trouvé
//   socket.emit('cvScraping', { error: 'Aucun logo trouvé sur la page' });
// }
//   //socket.emit('cvScraping',{logoSrc})
    
//  })

  console.log('A user connected');

  
  // evenement de deconnection
  socket.on('disconnect', function () {
    
    // socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
     console.log('A user disconnected');
  });
  
});

// fin communication socket.io



app.get('/', function(req, res){
  const filePath = path.resolve(__dirname, 'public', 'test.html');
  res.sendFile(filePath);
});


//*** lancement du serveur */

db.sequelize
  .authenticate()
  .then(() => {
    console.log("connexion a la BD  ok");
  })
  .then(() => {
    server.listen(port, () => {
      console.log(`server: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("la connexion a la BD a echouee", error);
  });


  
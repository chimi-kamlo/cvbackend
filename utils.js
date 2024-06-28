
const db = require("./config/dbconfig")


async function storePDFInDatabase(id,finalPath,docxPath) {
  try {
    let dateActuelle = new Date();
      await db.CV.create({ userId:id ,date_creation:dateActuelle,path:finalPath,docxPath:docxPath});
      console.log('PDF inséré avec succès dans la base de données');
  } catch (error) {
      console.error('Erreur lors de l\'insertion du PDF :', error);
  }
} 

let tableau;

// Formatage des compétences sous forme de chaîne de caractères
function formatCompetence(tableau) {
    let chaine = " j'ai les compétences suivante: "; 

    tableau.forEach(element => {
        chaine += `${element.nom_competence},`; 
    });

    return chaine;
}
// formatage des educations sous forme de chaine de carractere
 const formatEducation = (tableau)=>{
    let chaine = "education: "

    tableau.forEach(element => {
        chaine +=  `${element.diplome} en  ${element.date} a l'ecole ${element.nom_ecole},` 
        
    });
    return chaine

}

// formatage des experiences sous forme de chaine de carractere
const formatExperience = (tableau)=>{
   let chaine = "experience: "
   let employeur = ''
   tableau.forEach(element => {
     employeur +=` j'ai travaillé dans l'entreprise ${element.employeur} située:${element.adresse_entreprise} de ${element.date_debut} à ${element.date_fin} où j'occupais le poste de ${element.poste} voici une petite description:${element.description}`
    chaine +=  `${employeur},` 
    
});
return chaine
 }

 // formatage des informations personnels de l'utilisateur

 const formatLangues = (tableau)=>{
  let chaine = "Langues parlées: "
    
  tableau.forEach(element => {
    if(element.pourcentage >=50){
      
      chaine+= `${element.langue}-Courant,`
    }
    if(element.pourcentage<50){
     
      chaine+= `${element.langue}-Intermédiaire,`
             
    }

    
  })
  return chaine;
 }
 //formatage loisir
 const formatLoisir = (tableau)=>{
  let chaine = 'loisir:'
  tableau.forEach(element => {
    chaine+=`${element.nom_loisir},`
  })

  return chaine;

 }


// formatage des certifications sous forme de chaine de carractere
const formatCertification = (tableau)=>{
   let chaine = " j'ai les certifications suivante: " 
   if(Array.isArray(tableau) && tableau.length > 0){
    tableau.forEach(element => {
        chaine +=  `${element.intitule} obtenue en ${element.date} description:${element.description} j'ai obtenu cette certification au:${element.centre_formation} ,` 
        
    });
       return chaine
   }
   return ''
}
// formatage final du resume de l'utilisateur
const formatage = (certifications,competences,education,experiences)=>{
    certificats = formatCertification(certifications)
     competences =  formatCompetence(competences)
     educations =  formatEducation(education) 
     experiences =  formatExperience(experiences)

     return ` a parti de mes information suivante es ce que tu peux fait une breve presentation de moi pour que je puise mettre dans mon cv:${educations} , ${competences},${experiences},${certificats} ` 

}
 
 
const formatResume = (tableau)=>{
  let chaine = 'Mon résumé: '
  if(Array.isArray(tableau) && tableau.length > 0){
    tableau.forEach(element => {
        chaine +=  `${element.resume}  ,` 
        
    });
       return chaine
   }
   return '';
}

const formatPerso = (tableau) => {
  
  if (!Array.isArray(tableau) ) {
    console.log(ta)
    return `Informations personnelles: nom=${tableau.nom},prenom=${tableau.prenom},profession=${tableau.profession},email=${tableau.email},adresse=${tableau.adresse},sexe=${tableau.sexe} ,nationnalite =${tableau.nationalite},date_naissance=${tableau.date_naissance}`;
  }
  
  let chaine = 'Informations personnelles:';
  tableau.forEach(element => {  
    chaine += `nom=${element.nom},prenom=${element.prenom},profession=${element.profession},email=${element.email},adresse=${element.adresse}`;
  });
  return chaine;
}
 
const compileTemplate = (templateData) => {
  const source = fs.readFileSync('./public/template.html', 'utf8');
  const template = handlebars.compile(source);
  return template(templateData);
};
  
const createPDF = async (html, pdfPath) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage({timeout: 90000,});
  await page.setContent(html, { waitUntil: 'networkidle0' }); // attendre le chargement des images
  await page.pdf({ path: pdfPath, format: 'A4' });
  await browser.close();
};
async function blobToBuffer(blob) {
  return Buffer.from(await blob.arrayBuffer());
}
module.exports = {
    formatCompetence,
    formatEducation,
    formatCertification,
    formatExperience,
    formatResume,
    formatLangues,
    formatLoisir,
    formatPerso,
    compileTemplate,
    createPDF,
    storePDFInDatabase,
    blobToBuffer,

}
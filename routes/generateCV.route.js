const Router =require("express")
let router = Router();
const cvCtlr = require("../controllers/generateCv.controller")
/**
 * @swagger
 * /generatecv:
 *   post:
 *     summary: enregistrement  des langues de  l'utilisateur
 *     description: cette route permet d'enregistrer les langues de  l' utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      question:
 *                         type: text
 *                         description: question de l'utilisateur
 *                         example: bonjour
 *                      reponse:
 *                           type: text
 *                           description: reponse de l'IA
 *                           example: bonjour je suis la pour vous aider
 *                      date_reponse:
 *                         type: date
 *                         description: date de reponse de l'IA
 *                         example: 12/03/1024
 *                      date_question:  
 *                          type: date
 *                          description: date a laquelle l'utilisateur a posse la question
 *                          example: 12/03/1024
 *                      template_id:
 *                           type: string
 *                           description: identifiant de l'id du model de cv choisir pas l'utilisateur
 *                           example: 42C06069-39A0-4FAE-B1A1-87DBCD7ADFEF
 *                      data:
 *                        type: array
 *                        items:
 *                           type: object
 *                           properties:
 *                               nom:
 *                                 type: string
 *                                 description: nom de l'utilisateur
 *                                 example: chimiste
 * 
 *                               prenom:
 *                                  type: string
 *                                  description: prenom de l'utilisateur
 *                                  example: romaric
 *                               profession:
 *                                    type: string
 *                                    description: votre status profesionnel
 *                                    example: developpeur
 *                               sexe:
 *                                 type: string
 *                                 description: genre de l'utilisateur
 *                                 example: masculin    
 *                               nationalite:      
 *                                    type: string
 *                                    description: nationalite de l'utilisateur
 *                                    example: camerounaise
 *                               date_naissance:
 *                                      type: date
 *                                      description: date de naissance de l'utilisateur
 *                                      example: 12/04/1888
 *                               email:
 *                                   type: string
 *                                   description: adresse electronique de l'utilisateur
 *                                   example: romarickamlo60@gmail.com
 *                               image: 
 *                                   type: string
 *                                   description: image de l'utilisateur
 *                                   example: profil.png
 *                               adresse:
 *                                  type: string
 *                                  description: lieu d'habitation de l'utilisateur
 *                                  example: yaounde obili
 *                               projet:
 *                                  type: array
 *                                  items: 
 *                                    type: object
 *                                    properties:
 *                                        nom_projet:
 *                                           type: string
 *                                           description: nom du projet que vous avez eu à realiser
 *                                           example: application de gestion de stock
 *                                        entreprise:
 *                                             type: string
 *                                             description: structure où vous avez realise votre projet
 *                                             example: TIC
 *                                        annee_realisation:  
 *                                               type: date
 *                                               description: parler un peut de votre projet
 *                                               example: 2024
 *                                        url_projet:
 *                                              type: string
 *                                              description: il s'agit de l'url qui pourra donner acces a votre projet
 *                                              example: https://application.com
 *                                        description: 
 *                                              type: text
 *                                              description: parler un peu de votre projet
 *                                              example: projet realise dans le cadre de ma soutenance  
 * 
 *                               experience:
 *                                   type: array
 *                                   items:
 *                                      type: object
 *                                      properties:
 *                                          employeur:
 *                                             type: string
 *                                             description: nom de l'entreprise
 *                                             example: TIC 
 *                                          poste: 
 *                                            type: string
 *                                            description: nom du poste
 *                                            example: developpeur
 *                                          date_debut: 
 *                                               type: date
 *                                               description: date de debut dans l'entreprise
 *                                               example: 12/05/2004
 *                                          date_fin:
 *                                             type: date
 *                                             description: fin de parcours dans l'entreprise
 *                                             example: 12/05/2024
 *                                          adresse_entreprise:
 *                                                  type: string
 *                                                  description: localisation de l'entreprise
 *                                                  example: yaounde Obili
 *                                          description:
 *                                                type: text
 *                                                description: parler un peu de ton parcours scolaire
 *                                                example: diplome obtenu avec bravo
 *                               education:
 *                                  type: array
 *                                  items:
 *                                    type: object
 *                                    properties:
 *                                       nom_ecole:
 *                                          type: string
 *                                          description: donner le nom de l'ecole  
 *                                          example: LB Mbouda
 *                                       diplome:
 *                                           type: string
 *                                           description: nom de votre diplome 
 *                                           example: Bac D
 *                                       date:
 *                                         type: date
 *                                         description: date d'obtention du diplome
 *                                         example: 12/03/2003
 *                                       ville_ecole:  
 *                                           type: string
 *                                           description: ville d'obttention du diplome
 *                                           example: Mbouda
 *                               
 *                               
 *                               loisir:
 *                                  type: array
 *                                  items:
 *                                    type: string
 *                                    properties:
 *                                        nom_loisir:
 *                                           type: string
 *                                           description: il s'agit de vos activitees favories
 *                                           example: ecouter de la musique
 *                               langue:
 *                                  type: array
 *                                  items:
 *                                    type: object
 *                                    properties:
 *                                       langue:
 *                                          type: string
 *                                          description: il s'agit de vos langues favories
 *                                          example: ecouter allemand
 *                                       pourcentage:
 *                                           type: string
 *                                           description: il s'agit de votre degres de comprehension de la langue
 *                                           example: 65%
 *                               certification:
 *                                    type: array
 *                                    items:
 *                                      type: object
 *                                      properties:
 *                                         intitule:
 *                                             type: string
 *                                             description: nom  de la certification.
 *                                             example: react js certification
 *                                         centre_formation:
 *                                             type: string
 *                                             description: nom du centre où vous avez obtenu votre certification
 *                                             example:  UY1
 *                                         date:
 *                                            type: date
 *                                            description:  date d'obtention du certificat
 *                                            example: 31/03/2024
 *                                         description:
 *                                             type: text
 *                                             description: parler un peu de votre certification
 *                                             example: Certificat obtenu avec brio.    
 *                                             required: false
 *                               competence:
 *                                  type: array
 *                                  items:
 *                                    type: string
 *                                    properties:
 *                                        nom_competence:
 *                                            type: string
 *                                            description: nom de votre competence
 *                                            example: node js/ expresse
 * 
 * 
 *                      
 *     responses:
 *      400:
 *       description: quand un champ n'a pas ete remplir
 *       content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties: 
 *                     message: 
 *                        type: string
 *                        description: message d'avertissement 
 *                        example: rassuré vous d'avoir remplir tous les champs 
 *      500:
 *       description: Database error ou server error 
 *       content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                     message:
 *                        type: string
 *                        description: message d 'avertissement
 *                        example: Database error
 *                     error:
 *                       type: string
 *                       description: detail sur l'erreur 
 *                       example: le numero de telephone doit etre unique  
 *      200:
 *       description: quand le cv a ete généré avec succès 
 *       content:   
 *          application/json:
 *                 schema:
 *                    type: object
 *                    properties:   
 *                         message:
 *                           type: string
 *                           description: message de confirmation. 
 *                           example: competence enregistré avec succes
 *                         url:
 *                           type: string
 *                           description: lien de telechargement du cv par l'utilisateur
 *                           example: https://pdfmonkey-store.s3.eu-west-3.amazonaws.com/production/backend/document/9b9682f8-38dd-4908-bbd6-c3fe9c38bb26/document.pdf?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2DEHCSJKRKT25747%2F20240326%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240326T171416Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=43ccfaec169594464e0ab46f34a888e53b077297863c4f0a68900c54316469e9   
 * 
 */ 

router.post("", cvCtlr.generateCvPdf);
router.post("/plan_carriere", cvCtlr.UserPlanDeCarriere)
router.post("/plus_competence",cvCtlr.UserPlusCompetence)
router.post("/cv_jod_description",cvCtlr.UserCvJobDescription)

router.get("/getCv",cvCtlr.getcv)
router.post('/cvpdf',cvCtlr.pdfcv)
router.get('/download/:id',cvCtlr.showCv)
router.get('/downloadAll',cvCtlr.getAll)
module.exports = router;

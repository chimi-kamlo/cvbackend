const Router =require("express")
let router = Router();
const projetCtlr = require("../controllers/projet.controller")


/**
 * @swagger
 * /projet:
 *   post:
 *     summary: enregistrement d'un projet
 *     description: cette route permet d'enregistrer les projet realises  pas l'utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      nom_projet:
 *                          type: string
 *                          description: nom du projet que vous avez eu à realiser
 *                          example: application de gestion de stock
 *                      entreprise:
 *                         type: string
 *                         description: structure où vous avez realise votre projet
 *                         example: TIC
 *                      annee_realisation:  
 *                           type: date
 *                           description: parler un peut de votre projet
 *                           example: 2024
 *                      url_projet:
 *                          type: string
 *                          description: il s'agit de l'url qui pourra donner acces a votre projet
 *                          example: https://application.com
 *                      description: 
 *                           type: text
 *                           description: parler un peu de votre projet
 *                           example: projet realise dans le cadre de ma soutenance  
 * 
 *     responses:
 *        200:
 *         description: quand l'experience est enregistre avec succes
 *         content:   
 *               application/json:
 *                     schema:
 *                         type: object
 *                         properties:   
 *                            message:
 *                               type: string
 *                               description: message de confirmation. 
 *                               example: competence enregistré avec succes
 *                            data:
 *                              type: object
 *                              properties:
 *                                    id:
 *                                      type: integer
 *                                      description: identifiant unique du projet 
 *                                      example: 0 
 *                                    userId:
 *                                      type: integer
 *                                      example: 0 
 *                                      description: identifiant de l'utilisateur .
 *                                    nom_projet:
 *                                      type: string
 *                                      description: nom du projet que vous avez eu à realiser
 *                                      example: application de gestion de stock
 *                                    entreprise:
 *                                      type: string
 *                                      description: structure où vous avez realise votre projet
 *                                      example: TIC
 *                                    annee_realisation:  
 *                                          type: date
 *                                          description: parler un peut de votre projet
 *                                          example: 2024
 *                                    url_projet:
 *                                       type: string
 *                                       description: il s'agit de l'url qui pourra donner acces a votre projet
 *                                       example: https://application.com
 *                                         
 *                                    description: 
 *                                         type: text
 *                                         description: parler un peu de votre projet
 *                                         example: projet realise dans le cadre de ma soutenance  
 *                                   
 *        500:
 *         description: Database error ou server error 
 *         content:
 *            application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                        message:
 *                           type: string
 *                           description: message d 'avertissement
 *                           example: Database error
 *                        error:
 *                          type: string
 *                          description: detail sur l'erreur 
 *                          example: le numero de telephone doit etre unique 
 *        400:
 *         description: quand un champ n'a pas ete remplir
 *         content:
 *           application/json:
 *               schema:
 *                  type: object
 *                  properties: 
 *                      message: 
 *                         type: string
 *                         description: message d'avertissement 
 *                         example: rassuré vous d'avoir remplir tous les champs 
 */ 
router.put("", projetCtlr.createProjet);


module.exports = router;

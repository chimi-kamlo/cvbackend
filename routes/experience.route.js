const Router =require("express")
let router = Router();
const expCtlr = require("../controllers/experience.controller")


 /**
 * @swagger
 * /experience:
 *   post:
 *     summary: enregistrement d'une competences
 *     description: cette route permet d'enregistrer les competences  d'un utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                       employeur:
 *                          type: string
 *                          description: nom de l'entreprise
 *                          example: TIC
 *                       poste:
 *                         type: string
 *                         description: nom du poste
 *                         example: developpeur
 *                       date_debut: 
 *                          type: date
 *                          description: date de debut dans l'entreprise
 *                          example: 12/05/2004
 *                       date_fin:
 *                          type: date
 *                          description: fin de parcours dans l'entreprise
 *                          example: 12/05/2024
 *                       adresse_entreprise:
 *                             type: string
 *                             description: localisation de l'entreprise
 *                             example: yaounde Obili
 *                      
 *                       description:
 *                            type: text
 *                            description: parler un peu de ton parcours scolaire
 *                            example: diplome obtenu avec bravo
 *                       
 *                        
 *                         
 *                     
 * 
 *     responses:
 *       200:
 *        description: quand l'experience est enregistre avec succes
 *        content:   
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
 *                                      description: identifiant unique de l'education 
 *                                      example: 0 
 *                                    userId:
 *                                      type: integer
 *                                      example: 0 
 *                                      description: identifiant de l'utilisateur .
 *                                    employeur:
 *                                        type: string
 *                                        description: nom de l'entreprise
 *                                        example: TIC
 *                                    poste: 
 *                                       type: string
 *                                       description: nom du poste
 *                                       example: developpeur
 *                                    date_debut: 
 *                                        type: date
 *                                        description: date de debut dans l'entreprise
 *                                        example: 12/05/2004
 *                                    date_fin:
 *                                        type: date
 *                                        description: fin de parcours dans l'entreprise
 *                                        example: 12/05/2024
 *                                    adresse_entreprise:
 *                                          type: string
 *                                          description: localisation de l'entreprise
 *                                          example: yaounde Obili
 *                                    description:
 *                                       type: text
 *                                       description: parler un peu de ton parcours scolaire
 *                                       example: diplome obtenu avec bravo
 *       500:
 *        description: Database error ou server error 
 *        content:
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
 *     
 * 
 *       400:
 *        description: quand un champ n'a pas ete remplir
 *        content:
 *           application/json:
 *               schema:
 *                  type: object
 *                  properties: 
 *                      message: 
 *                         type: string
 *                         description: message d'avertissement 
 *                         example: rassuré vous d'avoir remplir tous les champs 
 *                
 * 
 */ 


router.put("", expCtlr.createExperience);
module.exports = router;
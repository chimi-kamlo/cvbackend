const Router =require("express")
let router = Router();
const certiCtlr = require("../controllers/certification.controller")

  /**
 * @swagger
 * /certification:
 *   post:
 *     summary: enregistrement d'une certification
 *     description: cette route permet d'enregistrer les certifications  d'un utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                         intitule:
 *                             type: string
 *                             description: nom de la certification.
 *                             example: react js certificat
 *                         centre_formation::
 *                            type: string
 *                            description: une petite description de la certification
 *                            example: Certificat obtenu avec brio
 *                         date:
 *                           type: date
 *                           description:  date d'obtention du certificat
 *                           example: 31/03/2024
 *                         description:
 *                           type: text
 *                           description: parler un peu de votre certificat
 *                           example: Certificat obtenu avec brio.    
 *                           required: false
 *     responses:
 *        
 *         200:
 *          description: quand la certification est enregistre avec succes
 *          content:   
 *               application/json:
 *                     schema:
 *                         type: object
 *                         properties:   
 *                            message:
 *                               type: string
 *                               description: message de confirmation. 
 *                               example: certification enregistré
 *                            data:  
 *                              type: object
 *                              properties:
 *                                   id:
 *                                    type: integer
 *                                    example: 0 
 *                                   userId:
 *                                     type: integer
 *                                     example: 0 
 *                                     description: identifiant de l'utilisateur a l'origine de la certification.
 *                                   intitule:
 *                                      type: string
 *                                      description: nom  de la certification.
 *                                      example: react js certification
 *                                   centre_formation:
 *                                             type: string
 *                                             description: nom du centre où vous avez obtenu votre certification
 *                                             example:  UY1
 *                                   date:
 *                                     type: date
 *                                     description:  date d'obtention du certificat
 *                                     example: 31/03/2024
 *                                   description:
 *                                       type: text
 *                                       description: parler un peu de votre certification
 *                                       example: Certificat obtenu avec brio.    
 *                                       required: false
 *                                       
 *                                     
 *         500:
 *           description: Database error ou server error
 *           content:
 *              application/json:
 *                  schema:
 *                  type: object
 *                  properties:
 *                      message: 
 *                         type: string
 *                         example: Database error
 *                      error:
 *                         type: string
 *                         example: le numero de telephone doit etre unique              
 *         400:
 *           description: quand un champ n'a pas ete remplir
 *           content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties: 
 *                      message: 
 *                        type: string
 *                        example: rassuré vous d'avoir remplir tous les champs 
 * 
 *     
 *          
 *     
 */         

router.put("", certiCtlr.createCertification);

module.exports = router;

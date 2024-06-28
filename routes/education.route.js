const Router =require("express")
let router = Router();
const eduCtlr = require("../controllers/education.controller")



/**
 * @swagger
 * /education:
 *   post:
 *     summary: enregistrement du parcours etucatif
 *     description: cette route permet d'enregistrer le niveau educatif d'un utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                        nom_ecole:
 *                           type: string
 *                           description: donner le nom de l'ecole  
 *                           example: LB Mbouda
 *                        diplome:
 *                           type: string
 *                           description: nom de votre diplome 
 *                           example: Bac D
 *                        date:
 *                          type: date
 *                          description: date d'obtention du diplome
 *                          example: 12/03/2003
 *                        ville_ecole:  
 *                           type: string
 *                           description: ville d'obttention du diplome
 *                           example: Mbouda
 *     responses:
 *         200:
 *          description: quand l'education est enregistre avec succes
 *          content:   
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
 *                                   id:
 *                                    type: integer
 *                                    description: identifiant de l'education
 *                                    example: 0 
 *                                   userId:
 *                                     type: integer
 *                                     example: 0 
 *                                     description: identifiant de l'utilisateur .
 *                                   nom_ecole:
 *                                       type: string
 *                                       description: donner le nom de l'ecole  
 *                                       example: LB Mbouda
 *                                   diplome:
 *                                       type: string
 *                                       description: nom de votre diplome 
 *                                       example: Bac D
 *                                   ville_ecole:  
 *                                          type: string
 *                                          description: ville d'obttention du diplome
 *                                          example: Mbouda
 * 
 *         500:
 *          description: Database error ou server error
 *          content:
 *             application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                      message:
 *                         type: string
 *                         example: Database error
 *                      error:
 *                        type: string
 *                        example: le numero de telephone doit etre unique
 * 
 *         400:
 *           description: quand un champ n'a pas ete remplir
 *           content:
 *              application/json:
 *                   schema:
 *                      type: object
 *                      properties: 
 *                         message: 
 *                           type: string
 *                           example: rassuré vous d'avoir remplir tous les champs 
 * 
 */


router.put("", eduCtlr.createEducation);

module.exports = router;

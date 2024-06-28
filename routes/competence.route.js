const Router =require("express")
let router = Router();
const compCtlr = require("../controllers/competence.controller")


 /**
 * @swagger
 * /competence:
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
 *                      nom_competence:
 *                           type: string
 *                           description: nom de votre competence
 *                           example: react native
 *                      pourcentage:
 *                           type: string
 *                           description: votre niveau d'aptitude 
 *                           example: 70%
 *     responses:
 *        
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
 *         200:
 *          description: quand la competence est enregistre avec succes
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
 *                                    description: identifiant de la certification
 *                                    example: 0 
 *                                   userId:
 *                                     type: integer
 *                                     example: 0 
 *                                     description: identifiant de l'utilisateur a l'origine de la certification.
 *                                   nom_competence:
 *                                       type: string
 *                                       description: nom de votre competence
 *                                       example: react native
 *                                   pourcentage:
 *                                       type: string
 *                                       description: votre niveau d'aptitude 
 *                                       example: 70%
 *                                   
 * 
 */

router.put("", compCtlr.createCompetence);

module.exports = router;

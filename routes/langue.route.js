const Router =require("express")
let router = Router();
const langueCtlr = require("../controllers/langue.controller")



/**
 * @swagger
 * /langue:
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
 *                        langue:
 *                          type: string
 *                          description: il s'agit de vos langues favories
 *                          example: ecouter allemand
 *                        pourcentage:
 *                           type: string
 *                           description: il s'agit de votre degres de comprehension de la langue
 *                           example: 65%
 *     responses:
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
 *        200:
 *         description: quand la langue est enregistre avec succes
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
 *                                  id:
 *                                   type: integer
 *                                   description: identifiant de la langue
 *                                   example: 0
 *                                  userId:
 *                                     type: integer
 *                                     description: identifiant de l'utilisateur
 *                                     example: 0
 *                                  langue:
 *                                     type: string
 *                                     description: il s'agit de vos langues favories
 *                                     example: ecouter allemand
 *                                  pourcentage:
 *                                     type: string
 *                                     description: il s'agit de votre degres de comprehension de la langue
 *                                     example: 65%
 */                                 
router.put("", langueCtlr.createLangue);

module.exports = router;

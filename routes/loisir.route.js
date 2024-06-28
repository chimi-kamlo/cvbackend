const Router =require("express")
let router = Router();
const loisirCtlr = require("../controllers/loisir.controller")

/**
 * @swagger
 * /loisir:
 *   post:
 *     summary: enregistrement  des loisirs de  l'utilisateur
 *     description: cette route permet d'enregistrer les loisirs de  l' utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                        nom_loisir:
 *                          type: string
 *                          description: il s'agit de vos activitees favories
 *                          example: ecouter de la musique
 *     responses:
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
 *        200:
 *         description: quand le loisir est enregistre avec succes
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
 *                                 nom_loisir:
 *                                      type: string
 *                                      description: il s'agit de vos activitees favories
 *                                      example: ecouter de la musique
 */

router.put("", loisirCtlr.createLoisir);

module.exports = router;

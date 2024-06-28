const Router =require("express")
let router = Router();

const resumeCtlr = require("../controllers/resume.controller")


/**
 * @swagger
 * /resume:
 *   post:
 *     summary: enregistrement d'un petit resume sur le parcour profesionnel de l'utilisateur
 *     description: cette route permet d'enregistrer une petit description sur l' utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                        resume:
 *                          type: text
 *                          description: il s'agit d'une petit description de votre personne
 *                          example: je suis developpeur web depuis 2ans
 *     responses:
 *        200:
 *         description: quand le resume est enregistre avec succes
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
 *                                  resume:
 *                                     type: text
 *                                     description: il s'agit d'une petit description de votre personne
 *                                     example: je suis developpeur web depuis 2ans
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
 *                
 * 
 */
router.post("", resumeCtlr.createResume);

module.exports = router;

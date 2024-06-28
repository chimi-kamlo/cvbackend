const Router =require("express")
let router = Router();
const persoCtlr = require("../controllers/info_perso.controller")

/**
 * @swagger
 * /perso:
 *   post:
 *     summary: enregistrement  des informations personnel  de  l'utilisateur (nom,prenom ...)
 *     description: cette route permet d'enregistrer les informations personnel de  l' utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                        nom:
 *                          type: string
 *                          description: nom de l'utilisateur
 *                          example: chimiste
 *                        prenom:
 *                           type: string
 *                           description: prenom de l'utilisateur
 *                           example: romaric
 *                        profession:
 *                            type: string
 *                            description: votre status profesionnel
 *                            example: developpeur
 *                        sexe:
 *                          type: string
 *                          description: genre de l'utilisateur
 *                          example: masculin
 *                        nationalite:      
 *                              type: string
 *                              description: nationalite de l'utilisateur
 *                              example: camerounaise
 *                        date_naissance:
 *                             type: date
 *                             description: date de naissance de l'utilisateur
 *                             example: 12/04/1888
 *                        email:
 *                           type: string
 *                           description: adresse electronique de l'utilisateur
 *                           example: romarickamlo60@gmail.com
 *                        image: 
 *                           type: string
 *                           description: image de l'utilisateur
 *                           example: profil.png
 *                        adresse:
 *                           type: string
 *                           description: lieu d'habitation de l'utilisateur
 *                           example: yaounde obili
 *     responses:
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
 *       200:
 *        description: quand la langue est enregistre avec succes
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
 *                                  id:
 *                                   type: integer
 *                                   description: identifiant de la langue
 *                                   example: 0
 *                                  userId:
 *                                     type: integer
 *                                     description: identifiant de l'utilisateur
 *                                     example: 0
 *                                  nom:
 *                                    type: string
 *                                    description: nom de l'utilisateur
 *                                    example: chimiste
 *                                  prenom:
 *                                    type: string
 *                                    description: prenom de l'utilisateur
 *                                    example: romaric 
 *                                  profession:
 *                                      type: string
 *                                      description: votre status profesionnel
 *                                      example: developpeur
 *                                  sexe:
 *                                    type: string
 *                                    description: genre de l'utilisateur
 *                                    example: masculin
 *                                  nationalite:      
 *                                     type: string
 *                                     description: nationalite de l'utilisateur
 *                                     example: camerounaise
 *                                  date_naissance:
 *                                       type: date
 *                                       description: date de naissance de l'utilisateur
 *                                       example: 12/04/1888
 *                                  email:
 *                                     type: string
 *                                     description: adresse electronique de l'utilisateur
 *                                     example: romarickamlo60@gmail.com
 *                                  image: 
 *                                     type: string
 *                                     description: image de l'utilisateur
 *                                     example: profil.png
 *                                  adresse:
 *                                    type: string
 *                                    description: lieu d'habitation de l'utilisateur
 *                                    example: yaounde obili
 * 
 */ 
router.post("", persoCtlr.upload, persoCtlr.createUser);

module.exports = router;

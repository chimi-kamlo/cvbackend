
const Router =require("express")
let router = Router();
const userClt = require("../controllers/users.controller")


/**
 * @swagger
 * /inscription:
 *   post:
 *     summary: enregistrement d'un utilisateur
 *     description: cette route permet d'enregitrer un nouvelle utilisateur.
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                         telephone:
 *                             type: string
 *                             description: numero de telephone de l'utilisateur.
 *                             example: 692850283
 *                         password:
 *                            type: string
 *                            description: mot de passe de l'utilisateur crypté
 *                            example: $2b$10$teeVDWRX9eTa11guPGp82.ktxmPx9Chb3/1WPk.j6aVs59pH/iMBe
 *  
 *                       
 *     responses:
 *       500:
 *         description: Database error ou server error
 *         content:
 *            application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                         message: 
 *                             type: string
 *                             example: Database error
 *                         error:
 *                            type: string
 *                            example: le numero de telephone doit etre unique
 *       409:
 *        description: numero de telephone double
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                    message: 
 *                      type: string
 *                      example: le numero de telephone existe deja changer s'il vous plait
 *       200:
 *         description: Utilisateur enregistré avec succès
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties: 
 *                    message:
 *                      type: string
 *                      example: utilisateur enregistre avec succes
 *                    data:   
 *                       type: object
 *                       properties:
 *                         id:
 *                            type: integer
 *                            description: id de l'utilisateur.
 *                            example: 0
 *                         telephone:
 *                                
 *                             type: string
 *                             description: numero de telephone de l'utilisateur.
 *                             example: 692850283
 *                         password:
 *                            type: string
 *                            description: mot de passe de l'utilisateur crypté
 *                            example: $2b$10$teeVDWRX9eTa11guPGp82.ktxmPx9Chb3/1WPk.j6aVs59pH/iMBe
 *  
*/
router.post("", userClt.UserInscription);
/**
 * @swagger
 * /inscription/{telephone}:
 *   get:
 *     summary: récupération d'un utilisateur 
 *     description: cette route permet récupération d'un utilisateur avec toutes ses informations grace à son numero de telephone.
 *    
       
 *         
 *     parameters:
 *        - name: telephone
 *          in: path
 *          description: numero de telephone de l'utilisateur
 *          required: true
 *          schema:
 *             type: string 
 *     responses:
 *       500:
 *        description: Database error ou server error
 *        content:
 *            application/json:
 *                  schema:
 *                  type: object
 *                  properties:
 *                       message: 
 *                          type: string
 *                          example: Database error
 *                       error:
 *                           type: string
 *                           example: le numero de telephone doit etre unique
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *            application/json:
 *                   schema:
 *                       type: object
 *                       properties: 
 *                          message:
 *                               type: string
 *                               example: utilisateur enregistre avec succe
 *                          data:   
 *                            type: object
 *                            properties:
 *                                id:
 *                                  type: integer
 *                                  description: id de l'utilisateur.
 *                                  example: 0
 *                                telephone:
 *                                     type: string
 *                                     description: numero de telephone de l'utilisateur.
 *                                     example: 692850283
 *                                password:
 *                                      type: string
 *                                      description: mot de passe de l'utilisateur crypté
 *                                      example: $2b$10$teeVDWRX9eTa11guPGp82.ktxmPx9Chb3/1WPk.j6aVs59pH/iMBe
 *                                certifications:
 *                                       type: array
 *                                       items:
 *                                          type: object
 *                                          properties:
 *                                             id:
 *                                               type: integer
 *                                               description: identifiant unique de la certification.
 *                                               example: 0
 *                                            
 *                                             intitule:
 *                                                   type: string
 *                                                   description: ici c'est le nom de la certification.
 *                                                   example: certification cisco
 *                                             centre_formation:
 *                                                      type: string
 *                                                      description: nom du centre où vous avez obtenu votre certification
 *                                                      example:  UY1
 *                                             date:
 *                                               type: date
 *                                               description:  date d'obtention du certificat
 *                                               example: 31/03/2024
 *                                             description:
 *                                                 type: text
 *                                                 description: parler un peu de votre certificat
 *                                                 example: Certificat obtenu avec brio.    
 *                                                 required: false
 *                            competences:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                    type: integer
 *                                    description: identifiant unique de la competence.
 *                                    example: 0
 *                                   nom_competence:  
 *                                           type: string
 *                                           description: nom de la competence 
 *                                           example: react js     
 *                                   pourcentage:
 *                                        type: string
 *                                        description: donner votre niveau de comprehension sur 100
 *                                        example: 75 
 *                            education:  
 *                               type: array
 *                               items:  
 *                                  type: object
 *                                  properties: 
 *                                                                 
 *   
 */
router.get("/:telephone", userClt.getUser);

module.exports = router;

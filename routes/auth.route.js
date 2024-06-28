const Router =require("express")
let router = Router();
 const logCtlr = require("../controllers/auth.controller")

 /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: authentification d'un utilisateur
 *     description: cette route permet d'authentifier un utilisateur.
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
 *                            example: 12345
 *     responses:  
 *        
 *        200:
 *      
 *         description: Utilisateur enregistré avec succès
 *         content:
 *            application/json:
 *               schema:
 *                 type: object
 *                 properties: 
 *                    message:
 *                      type: string
 *                      example: utilisateur enregistre avec succe
 *                    
 *                    data:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          description: id de l'utilisateur.
 *                          example: 0
 *                        telephone:
 *                          type: string
 *                          description: numero de telephone de l'utilisateur.
 *                          example: 692850283
 *                        password:
 *                          type: string
 *                          description: mot de passe de l'utilisateur crypté
 *                          example: $2b$10$teeVDWRX9eTa11guPGp82.ktxmPx9Chb3/1WPk.j6aVs59pH/iMBe
 *     
 *                        acces_token:
 *                            type: string
 *                            description: cle d'API de l'utilisateur.
 *                            example: 0
 *        500:
 *          description: Database error ou server error
 *          content:
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
 *        409:
 *         description: quand le mot de passe et incorrect
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:  
 *                        message: 
 *                          type: string
 *                          example: password incorrect
 *            
 * 
 *        404:  
 *          description: quand l'utilisateur n'est pas trouve
 *          content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:  
 *                        message: 
 *                          type: string
 *                          example: l'utilisateur n'existe pas 
 *            
 *        400:
 *         description: quand un champ n'a pas ete remplir
 *         content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties: 
 *                    message: 
 *                      type: string
 *                      example: rassuré vous d'avoir remplir tous les champs 
 *     
 */  
router.post("/login", logCtlr.UserLogin);

module.exports = router;

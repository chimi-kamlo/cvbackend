const Router =require("express")
let router = Router();
const dialoCtlr = require("../controllers/dialogue.controller")

router.post("", dialoCtlr.createDialogue);
 
/**
 * @swagger
 * /dialogue/{userId}:
 *   get:
 *     summary: recuperation des messages d'un utilisateur
 *     description: cette route permet de recuperer les messages  d'utilisateur.
 *     parameters:
 *        - name: userId
 *          in: path
 *          description: identifiant  de l'utilisateur
 *          required: true
 *          schema:
 *             type: integer
 *     responses:
 *         400:
 *           description: quand un champ n'a pas ete remplir
 *           content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties: 
 *                       message: 
 *                          type: string
 *                          description: message d'avertissement 
 *                          example: rassuré vous d'avoir remplir tous les champs  
 * 
 *         500:
 *           description: Database error ou server error 
 *           content:
 *              application/json:
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
 *         200:
 *          description: quand la conversation est recuperee avec succes
 *          content:   
 *               application/json:
 *                     schema:
 *                         type: object
 *                         properties:   
 *                            message:
 *                               type: string
 *                               description: message de confirmation. 
 *                               example: information relative au dialogue entre l'utilisateur et l'IA
 *                            data:
 *                              type: array
 *                              items:
 *                                type: object
 *                                properties:
 *                                   id:
 *                                     type: integer
 *                                     description: identifiant du dialogue
 *                                     example: 0
 *                                   userId:
 *                                     type: integer
 *                                     description: identifiant de l'utilisateur
 *                                     example: 0
 *                                   question:
 *                                      type: text
 *                                      description: question de l'utilisateur
 *                                      example: bonjour
 *                                   reponse:
 *                                     type: text
 *                                     description: reponse de l'IA
 *                                     example: bonjour je suis la pour vous aider
 *                                   date_reponse:
 *                                      type: date
 *                                      description: date de reponse de l'IA
 *                                      example: 12/03/1024
 *                                   date_question:  
 *                                      type: date
 *                                      description: date a laquelle l'utilisateur a posse la question
 *                                      example: 12/03/1024
 *                                   links:
 *                                     type: string
 *                                     description: lien de telechargement du cv
 *                                     example: https://pdfmonkey-store.s3.eu-west-3.amazonaws.com/production/backend/document/9b9682f8-38dd-4908-bbd6-c3fe9c38bb26/document.pdf?response-content-disposition=attachment&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2DEHCSJKRKT25747%2F20240326%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20240326T171416Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=43ccfaec169594464e0ab46f34a888e53b077297863c4f0a68900c54316469e9 
 *                        
 * 
 * 
 */ 
router.get("/:userId",dialoCtlr.getDialogue);

module.exports = router;

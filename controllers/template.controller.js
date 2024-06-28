
const db = require("../config/dbconfig")
const Template = db.Template


exports.createTemplate = async (req,res)=>{

    const template = {templateId} = req.body
    try{

        const template =  await db.Template.findOne({where:{userId:req.id}})
        console.log(template)

        if(template!=null){
         let result1 = template.update({templateId:templateId})
         return  res.status(200).json({ message: "succes", data: result1 });
        }
         let result2 = db.Template.create({...req.body,userId:req.id})

        return  res.status(200).json({ message: "succes", data: result2 });
    }catch(error){
        if (error.name === "SequelizeDatabaseError") {
            return res.status(500).json({ message: "database error" });
          }
        
          return res.status(500).json({ message: "server error" });
    }


}
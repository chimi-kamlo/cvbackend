const Router =require("express")
let router = Router();
const templateCtl = require("../controllers/template.controller")

router.post("",templateCtl.createTemplate);

module.exports = router;
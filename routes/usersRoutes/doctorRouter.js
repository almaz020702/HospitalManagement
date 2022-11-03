const Router=require("express")
const doctorController = require("../../controllers/doctorController")
const router=Router()
router.get('/',doctorController.getOne)


module.exports=router
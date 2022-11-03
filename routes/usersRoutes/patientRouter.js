const Router=require("express")
const patientController = require("../../controllers/patientController")
const userController = require("../../controllers/userController")
const router=Router()

router.get('/',patientController.getOne)

module.exports=router
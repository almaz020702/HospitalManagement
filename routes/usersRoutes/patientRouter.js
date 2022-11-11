const Router=require("express")
const patientController = require("../../controllers/usersController/patientController")
const userController = require("../../controllers/usersController/userController")
const router=Router()

router.get('/',patientController.getOne)

module.exports=router
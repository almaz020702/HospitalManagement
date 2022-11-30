const Router=require("express")
const appointmentController = require("../../controllers/appointmentController")
const patientController = require("../../controllers/usersController/patientController")
const userController = require("../../controllers/usersController/userController")
const router=Router()

router.get('/',patientController.getOne)
router.get('/appointment',appointmentController.getAll)

module.exports=router
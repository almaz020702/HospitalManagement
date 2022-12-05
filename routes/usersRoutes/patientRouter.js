const Router=require("express")
const appointmentController = require("../../controllers/appointmentController")
const treatmentController = require("../../controllers/treatmentController")
const patientController = require("../../controllers/usersController/patientController")
const userController = require("../../controllers/usersController/userController")
const router=Router()

router.get('/',patientController.getOne)
router.get('/appointment',appointmentController.getAll)
router.get('/treatment',treatmentController.getAll)
router.patch('/treatment/:id/statusChange',treatmentController.changeStatus)
router.get('/treatment/history',treatmentController.getHistory)

module.exports=router
const Router=require("express")
const appointmentController = require("../../controllers/appointmentController")
const treatmentController = require("../../controllers/treatmentController")
const patientController = require("../../controllers/usersController/patientController")
const userController = require("../../controllers/usersController/userController")
const router=Router()

router.get('/',patientController.getOne)
router.get('/appointment',appointmentController.getAll)
router.get('/appointment/history',appointmentController.getHistory)
router.get('/treatment',treatmentController.getAll)
router.get('/treatment/history',treatmentController.getHistory)
router.patch('/treatment/:id/statusChange',treatmentController.changeStatus)

module.exports=router
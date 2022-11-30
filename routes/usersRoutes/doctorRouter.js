const Router=require("express")
const appointmentController = require("../../controllers/appointmentController")
const treatmentController = require("../../controllers/treatmentController")
const doctorController = require("../../controllers/usersController/doctorController")
const router=Router()
router.get('/',doctorController.getOne)
router.post('/treatment/:id',treatmentController.create)
router.get('/appointment',appointmentController.getAll)
module.exports=router
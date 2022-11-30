const Router=require("express")
const treatmentController = require("../../controllers/treatmentController")
const doctorController = require("../../controllers/usersController/doctorController")
const router=Router()
router.get('/',doctorController.getOne)
router.post('/treatment/:id',treatmentController.create)

module.exports=router
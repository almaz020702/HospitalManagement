const Router=require("express")
const appointmentController = require("../controllers/appointmentController")
const router=Router.Router({mergeParams:true})
router.post("/Slots",appointmentController.availableSlots)
router.post("/doctors",appointmentController.availableDoctors)
router.post("/",appointmentController.create)

module.exports=router
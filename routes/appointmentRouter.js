const Router=require("express")
const appointmentController = require("../controllers/appointmentController")
const router=Router.Router({mergeParams:true})
router.get("/Slots",appointmentController.availableSlots)
router.get("/doctors",appointmentController.availableDoctors)


module.exports=router
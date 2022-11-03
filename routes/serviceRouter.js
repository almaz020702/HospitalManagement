const Router=require("express")
const appointmentController = require("../controllers/appointmentController")
const serviceController = require("../controllers/serviceController")
const authMiddleware = require("../middleware/authMiddleware")
const router=Router()
router.get("/",serviceController.getAll)
router.get("/:id",serviceController.getOne)
router.get("/:id/appointment",appointmentController.availableSlots)
router.post("/",authMiddleware('admin'),serviceController.create)
router.delete("/:id",authMiddleware('admin'),serviceController.delete)

module.exports=router
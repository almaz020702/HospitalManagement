const Router=require("express")
const appointmentController = require("../controllers/appointmentController")
const serviceController = require("../controllers/serviceController")
const authMiddleware = require("../middleware/authMiddleware")
const appointmentRouter=require("./appointmentRouter")
const router=Router.Router({mergeParams:true})
router.get("/",serviceController.getAll)
router.get("/:id",serviceController.getOne)
router.use("/:id/appointment",authMiddleware('patient'),appointmentRouter)
router.post("/",authMiddleware('admin'),serviceController.create)
router.delete("/:id",authMiddleware('admin'),serviceController.delete)

module.exports=router
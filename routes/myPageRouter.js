const Router=require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router=Router()
const adminRouter=require('./usersRoutes/adminRouter')
const doctorRouter=require("./usersRoutes/doctorRouter")
const patientRouter=require("./usersRoutes/patientRouter")
router.use("/admin",authMiddleware('admin'),adminRouter);
router.use("/doctor",authMiddleware('doctor'),doctorRouter);
router.use("/patient",authMiddleware('patient'),patientRouter)
module.exports=router
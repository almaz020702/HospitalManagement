const Router = require("express");
const router = Router();
const userRouter = require("./userRouter");
const myPageRouter = require("./myPageRouter");
const departmentRouter = require("./departmentRouter");
const serviceRouter = require("./serviceRouter");
const authMiddleware = require("../middleware/authMiddleware");
const messangerRouter = require("./messangerRoutes/messangerRouter");
router.get("/", (req, res) => {
    res.send("working");
});
router.use("/user", userRouter);
router.use("/myPage", myPageRouter);
router.use("/departments", departmentRouter);
router.use("/services", serviceRouter);
router.use("/messanger", authMiddleware("doctor", "patient"), messangerRouter);
/*router.get("/admincreate",async (req,res)=>{
    const hashPassword = await bcrypt.hash("swefull100", 5);
    await Admin.create({email:"hospitalswe@gmail.com",password:hashPassword})
    return res.json({message:"created"})
})*/
module.exports = router;

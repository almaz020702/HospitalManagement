const Router=require("express")
const router=Router()
const adminController=require("../../controllers/usersController/adminController")
const userController=require('../../controllers/usersController/userController')
router.get('/',adminController.adminPage)
router.post("/doctor",userController.doctorRegistration)
router.post("/patient",userController.patientRegistration)
router.delete("/user/:id",adminController.userDelete)
// router.delete('/patient/:id',adminController.patientDelete)
router.patch('/doctor/:id',adminController.doctorUpdate)
router.patch('/patient/:id',adminController.patientUpdate)

module.exports=router
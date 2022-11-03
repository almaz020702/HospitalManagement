const Router=require("express")
const router=Router()
const adminController=require("../../controllers/adminController")
const userController=require('../../controllers/userController')
router.get('/',adminController.adminPage)
router.post("/doctor",userController.doctorRegistration)
router.post("/patient",userController.patientRegistration)
router.delete("/doctor/:id",adminController.doctorDelete)
router.delete('/patient/:id',adminController.patientDelete)
router.patch('/doctor/:id',adminController.doctorUpdate)
router.patch('/patient/:id',adminController.patientUpdate)

module.exports=router
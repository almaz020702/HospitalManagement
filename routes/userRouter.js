const Router=require('express')
const router=Router()
const userController=require('../controllers/usersController/userController')
router.post("/login",userController.login)


module.exports=router
const Router=require("express")
const conversationController = require("../controllers/conversationController")
const router=Router()

router.post('/',conversationController.create)
router.get('/',conversationController.getAllofUser)

module.exports=router
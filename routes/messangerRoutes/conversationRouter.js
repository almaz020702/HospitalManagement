const Router=require("express")
const conversationController = require("../../controllers/conversationController")
const router=Router()

router.post('/',conversationController.create)
router.get('/',conversationController.getAllofUser)
router.get("/:companionId",conversationController.getConversation)
module.exports=router
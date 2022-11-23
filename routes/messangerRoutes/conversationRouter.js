const Router=require("express")
const conversationController = require("../../controllers/conversationController")
const router=Router()

router.post('/',conversationController.create)
router.get('/',conversationController.getAllConversations)
router.get("/:companionId",conversationController.getOneConversation)
module.exports=router
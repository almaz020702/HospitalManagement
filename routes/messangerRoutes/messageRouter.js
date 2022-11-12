const Router=require("express")
const messageController = require("../../controllers/messageController")
const router=Router()

router.get("/:id",messageController.getConversationMessages)
router.post("/:id",messageController.create)
module.exports=router
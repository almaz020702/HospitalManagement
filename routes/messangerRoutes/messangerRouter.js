const Router = require("express");
const router = Router();
const messageRouter = require("./messageRouter");
const conversationRouter = require("./conversationRouter");
router.use("/conversation", conversationRouter);
router.use("/message", messageRouter);
module.exports = router;

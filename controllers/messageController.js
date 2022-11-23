const ApiError = require("../exceptions/apiError")
const { Conversation, Message } = require("../models/models")
const messageService=require("../service/messageService")
class MessageController{
    async create(req,res,next){
        const {id}=req.params
        const {text,doctorId,patientId}=req.body
        const conversation=await Conversation.findOne({where:{id}})
        if(!conversation){
            next(ApiError.BadRequest("No conversation with such id"))
        }
        const message= await Message.create({text,doctorId,patientId,conversationId:id})
        return res.json(message)
    }

    async getConversationMessages(req,res,next){
        try {
            const {id}=req.params
            const conversation=await Conversation.findOne({where:{id}})
            if(!conversation){
                next(ApiError.BadRequest("No conversation with such id"))
            }
            const messages=await Message.findAll({where:{conversationId:id}, order: [['createdAt','DESC']]})
            return res.json(messages)
        } catch (error) {
            next(error)
        }
    }
}


module.exports=new MessageController()

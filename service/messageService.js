const { Conversation, Message } = require("../models/models");

class MessageService{
    async create(data){
        const {text,senderId,recieverId,conversationId}=data
        const conversation=await Conversation.findOne({where:{id:conversationId}})
        if(!conversation){
            next(ApiError.BadRequest("No conversation with such id"))
        }
        const message= await Message.create({text,senderId,recieverId,conversationId})
        console.log(message);
    }
}



module.exports=new MessageService()
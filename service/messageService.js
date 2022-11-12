const { Conversation, Message } = require("../models/models");

class MessageService{
    async create(data){
        const {text,doctorId,patientId,conversationId}=data
        const conversation=await Conversation.findOne({where:{id:conversationId}})
        if(!conversation){
            next(ApiError.BadRequest("No conversation with such id"))
        }
        const message= await Message.create({text,doctorId,patientId,conversationId})
        console.log(message);
    }
}



module.exports=new MessageService()
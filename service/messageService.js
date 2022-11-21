const  sequelize = require("../db");
const { Conversation, Message } = require("../models/models");
class MessageService {
    async create(data) {
        try {
            const { text, senderId, recieverId, conversationId } = data;
            const conversation = await Conversation.findOne({ where: { id: conversationId } });
            if (!conversation) {
                console.log("No conversation with such id");
            }
            const message = await Message.create({ text, senderId, recieverId, conversationId });
            return message
        } catch (error) {
            console.log(error);
        }
    }

    async sortMessages(messages){
        try {
            const sortedMessages=await sequelize.query(`select * from messages 
                                                        where "conversationId"=${messages.conversationId}
                                                        order by "createdAt" asc
            `)

            return sortedMessages
        } catch (error) {
            console.log(error)
        }
        
    }
}

  

module.exports = new MessageService();

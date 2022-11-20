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
            console.log(message);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new MessageService();

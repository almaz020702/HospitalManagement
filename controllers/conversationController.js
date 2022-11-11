const ApiError = require("../exceptions/apiError");
const { Patient, Doctor, Conversation } = require("../models/models");

class ConversationController {
    async create(req, res, next) {
        try {
            const { patientId, doctorId } = req.body;
            const patient = await Patient.findOne({ where: { id: patientId } });
            if (!patient) {
                next(ApiError.BadRequest("No patient with such id"));
            }
            const doctor = await Doctor.findOne({ where: { id: doctorId } });
            if (!doctor) {
                next(ApiError.BadRequest("No doctor with such id"));
            }

            const conversation = await Conversation.create({ doctorId, patientId });
            res.json(conversation);
        } catch (error) {
            return next(error);
        }
    }
    async getAllofUser(req, res, next) {
        try {
            const { id, role } = req.user;
            let conversations;
            if (role === "patient") {
                conversations = await Conversation.findAll({ where: { patientId: id } });
            } else if (role === "doctor") {
                conversations = await Conversation.findAll({ where: { doctorId: id } });
            }
            res.json(conversations);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ConversationController();

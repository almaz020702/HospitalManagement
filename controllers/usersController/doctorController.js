const ApiError = require("../../exceptions/apiError");
const { Doctor, Service, Patient } = require("../../models/models");

class DoctorController {
    async getOne(req, res, next) {
        try {
            const { email } = req.user;
            const doctor = await Doctor.findOne({
                where: { email },
                include: Patient,
                attributes: { exclude: ["password"] },
            });
            return res.json(doctor);
        } catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const allDoctors = await Doctor.findAll({
                attributes: { exclude: ["password", "createdAt", "updatedAt"] },
                include: {
                    model: Service,
                },
            });
            return res.json(allDoctors);
        } catch (error) {
            next(error);
        }
    }
    async getDoctor(req, res, next) {
        try {
            const doctorId = req.params.id;
            const doctor = await Doctor.findOne({
                where: { id: doctorId },
                include: {
                    model: Service,
                },
                attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            });
            if (!doctor) {
                return next(ApiError.BadRequest("No doctor with such id"));
            }
            return res.json(doctor);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DoctorController();

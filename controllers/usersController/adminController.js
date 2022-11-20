const ApiError = require("../../exceptions/apiError");
const { Admin, Patient, Doctor,User } = require("../../models/models");
const path = require("path");

class adminController {
    async adminPage(req, res, next) {
        try {
            const allPatients = await Patient.findAll({
                attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            });
            const allDoctors = await Doctor.findAll({
                attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            });
            return res.json({ allPatients, allDoctors });
        } catch (error) {
            next(error);
        }
    }

    async userDelete(req,res,next){
        try {
            const {id}=req.params
            const user=await User.findOne({where:{id}});
            if(!user){
                next(ApiError.BadRequest("There is no user with such id"));
            }
            const count=await User.destroy({where:{id}});
            return res.json(count)
        } catch (error) {
            next(error)
        }
    }

    async doctorUpdate(req, res, next) {
        try {
            const { id } = req.params;

            const user = await Doctor.findOne({ where: { id } });
            if (!user) {
                next(ApiError.BadRequest("There is no user with such id"));
            }
            if (req.files) {
                const { photo } = req.files;
                const fileName = user.photo;
                photo.mv(path.resolve(__dirname, "..", "..","static", fileName));
            }

            const count = await Doctor.update(req.body, { where: { id } });

            return res.json(count);
        } catch (error) {
            next(error);
        }
    }

    async patientUpdate(req, res, next) {
        try {
            const { id } = req.params;
            const user = await Patient.findOne({ where: { id } });
            if (!user) {
                next(ApiError.BadRequest("There is no user with such id"));
            }
            const count = await Patient.update(req.body, { where: { id } });
            return res.json(count);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new adminController();

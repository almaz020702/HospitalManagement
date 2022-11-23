const { Doctor } = require("../../models/models")

class DoctorController{
    async getOne(req,res,next){
        try {
            const {email}=req.user
            const doctor=await Doctor.findOne({where:{email},attributes:{exclude:['password']}})
            return res.json(doctor) 
        } catch (error) {
            next (error)
        }
    }
    async getAll(req,res,next){
        try {
            const allDoctors = await Doctor.findAll({
                attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            });
            return res.json(allDoctors)
        } catch (error) {
            next(error)
        }
    }
}

module.exports=new DoctorController()
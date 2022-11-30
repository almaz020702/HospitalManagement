const { Doctor, Treatment } = require("../models/models")

class TreatmentController{
    async create(req,res,next){
        try {
            const {text}=req.body
            const patientId=req.params.id
            const userId=req.user.id
            const doctor=await Doctor.findOne({where:{userId}})
            const doctorId=doctor.id
            const treatment= await Treatment.create({text,patientId,doctorId})
            return res.json(treatment)
        } catch (error) {
            next(error)
        }
    
    }

}


module.exports=new TreatmentController()
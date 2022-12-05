const { Doctor, Treatment, Patient } = require("../models/models")

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

    async getAll(req,res,next){
        try {
            const userId=req.user.id
            const patient=await Patient.findOne({where:{userId}})
            const patientId=patient.id
            const treatments=await Treatment.findAll({where:{patientId,completed:'false'}})
            return res.json(treatments)
        } catch (error) {
            next(error)
        }
    }

    async changeStatus(req,res,next){
        try {
            const {id}=req.params
            const treatment= await Treatment.findOne({Where:{id}})
            treatment.completed='true'
            await treatment.save()
            return res.json("changed")
        } catch (error) {
            next(error)
        }
    }
    
}


module.exports=new TreatmentController()
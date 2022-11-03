const { Patient } = require("../models/models")

class PatientController{
    async getOne(req,res,next){
        try {
            const {id}=req.user
            const patient=await Patient.findOne({where:{id},attributes:{exclude:["password"]}})
            return res.json(patient) 
        } catch (error) {
            next(error)
        }
    }
}

module.exports=new PatientController()
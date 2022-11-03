const sequelize = require("../db");
const { BadRequest } = require("../exceptions/apiError");
const ApiError = require("../exceptions/apiError");
const { Service, Doctor } = require("../models/models");

class ServiceController {
    async getAll(req, res, next) {
        const services = await Service.findAll();
        return res.json(services);
    }

    async getOne(req,res,next){
        try {
            const {id}=req.params
            const service=await Service.findOne({where:{id},include:{model:Doctor, attributes:{include:["name","surname","category","email","id"]}}})
            if (!service){
                next(BadRequest("The service with that id does not exist"))
            }
            return(res.json(service))
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            const { service_name, price, departmentId, doctors } = req.body;
            const candidate = await Service.findOne({ where: { service_name } });
            if (candidate) {
                next(ApiError.BadRequest("The service with this name  already exists"));
            }

            const result = await sequelize.transaction(async (t) => {
                const service = await Service.create(
                    { service_name, price, departmentId },
                    { transaction: t }
                );
                for (const doctor of doctors) {
                    await service.addDoctor(await Doctor.findOne({ where: { id: doctor.id } }), {
                        through: { price: doctor.price },
                        transaction: t,
                    });
                }
                return service;
            });

            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const candidate=await Service.findOne({where:id})
            if(!candidate){
                next(ApiError.BadRequest("There is no service with such id"))
            }
            const deletedCount=await Service.destroy({where:id})
            return res.json(deletedCount)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ServiceController();

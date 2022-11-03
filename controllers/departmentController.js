const ApiError = require("../exceptions/apiError");
const { Department } = require("../models/models");

class departmentController {
    async getAll(req, res, next) {
        try {
            const deps = await Department.findAll();
            return res.json(deps);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const {department_name,department_info} = req.body;
            const candidate=await Department.findOne({where:{department_name}})
            if(candidate){
                next(ApiError.BadRequest("The department already exists"))
            }
            const dep=await Department.create({department_name,department_info})
            return res.json(dep)
        } catch (error) {
            next(error);
        }
    }


    async update(req,res,next){
        try {
            const{id}=req.params
            const candidate=await Department.findOne({where:{id}})
            if(!candidate){
                next(ApiError.BadRequest("There is no department with such id"))
            }
            const{department_name,department_info}=req.body
            const updateObject={}
            if(department_name) updateObject.department_name=department_name
            if(department_info) updateObject.department_info=department_info
            const updatedCount=await Department.update(updateObject,{where:{id}})
            return res.json(updatedCount)
        } catch (error) {
            next(error)
        }
    }
    async delete(req,res,next){
        try {
            const{id}=req.params
            const candidate=await Department.findOne({where:{id}})
            if(!candidate){
                next(ApiError.BadRequest("There is no department with such id"))
            }
            const deletedCount=await Department.destroy({where:{id}})
            res.json(deletedCount)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new departmentController();

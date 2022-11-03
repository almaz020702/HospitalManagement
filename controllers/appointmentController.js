const sequelize = require("../db");
const {QueryTypes}=require('sequelize')
const appointmentService = require("../service/appointmentService");

class AppointmentController {
    async availableSlots(req, res, next){
        try {
            let allSlots=await sequelize.query(`with my_table as (
                select '2016-11-09 09:00:00'::timestamp start_date
                )
            
            
            SELECT *
                FROM generate_series(
                   CURRENT_DATE+interval '9 hours',
                   CURRENT_DATE+interval '6 days 18 hours',
                   INTERVAL '30 minutes'
                ) slot
            EXCEPT
            SELECT start_date
            FROM my_table 
            where start_date >= '2016-11-09' and start_date < '2016-11-10'
            order by slot`,{type:QueryTypes.SELECT})
            console.log(allSlots[0].slot);
            allSlots=allSlots.map(slot=>slot.slot)
            return res.json(allSlots)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AppointmentController();

/*
async availableSlots(req, res, next) {
    try {
        const today = new Date();
        
        const endDay = new Date(new Date().setDate(new Date().getDate() + 7));
        

        var allSlots = {}
        for (var i = new Date(today); i < endDay; i.setDate(i.getDate() + 1)) {
            var day=`${i.getFullYear()}-${i.getMonth()+1}-${i.getDate()}`
            allSlots[day]=appointmentService.getTimeSlotsForDay(i);
        }
        console.log(allSlots)
        return res.json(allSlots)
    } catch (error) {
        next(error)
    }
}*/
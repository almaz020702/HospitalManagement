const sequelize = require("../db");
const { QueryTypes } = require("sequelize");
const appointmentService = require("../service/appointmentService");

class AppointmentController {
    async availableSlots(req, res, next) {
        try {
            const { date } = req.body;
            console.log(date);
            const { id } = req.params;
            let allSlots = await sequelize
                .query(
                    `
            WITH slots as(
                SELECT *
                FROM generate_series(
                        ('${date}'::DATE + interval '8 hours'),
                        ('${date}'::DATE+ interval '18 hours'),
                        INTERVAL '30 minutes'
                    ) as slot
                order by slot
            ),service_duration as(
                Select services.duration
                from services
                where services.id=${id}
            ),
            doctor_count as(
                Select count(d) as dcount
                from "doctorServices" AS ds
                    INNER JOIN doctors as d on ds."doctorId" = d.id
                where ds."serviceId" = ${id}
            )
            select s.slot
            FROM slots s, doctor_count
            where doctor_count.dcount>(
                SELECT COUNT(DISTINCT d.id) AS slot_appointment_count
                FROM appointments AS ap
                INNER JOIN doctors AS d ON d.id = ap."doctorId",service_duration
                WHERE ap."serviceId" = ${id}
                    AND ap."startDate" < s.slot + (service_duration.duration*interval '1 minute')
                    AND ap."endDate" > s.slot
                
            )
            `,
                    { type: QueryTypes.SELECT }
                )
                .then((rows) => rows.map(({ slot }) => slot));

            return res.json(allSlots);
        } catch (error) {
            next(error);
        }
    }
    async availableDoctors(req, res, next) {
        try {
            const { time } = req.body;
            const {id}=req.params
            const doctors = await sequelize.query(
                `with slots as(
                SELECT *
                FROM generate_series(
                        '${time}'::DATE + interval '8 hours',
                        '${time}'::DATE + interval '18 hours',
                        INTERVAL '30 minutes'
                    ) as slot
                order by slot
            ),service_duration as(
                Select services.duration
                from services
                where services.id=${id}
            )
            select d.id, d.email, d.name || ' ' || d.surname as "fullName" from doctors as d
            inner join "doctorServices" as ds on ds."doctorId" = d.id and ds."serviceId" = 10
            WHERE NOT EXISTS (
                select 1 from appointments as ap,service_duration
                WHERE ap."serviceId" = ds."serviceId" AND ap."doctorId" = ds."doctorId"
                    AND ap."startDate" < '${time}'::timestamp+service_duration.duration*interval '1 minute'
                    AND ap."endDate" > '${time}'::timestamp
                    AND EXISTS (
                        select 1
                        from slots as s
                        where s.slot = '${time}'::timestamp
                    )
            )`,
                { type: QueryTypes.SELECT }
            );
            return res.json(doctors);
        } catch (error) {
            next(error);
        }
    }


    async create(req, res, next) {
        try {
            const {id:serviceId}=req.params
            
        } catch (error) {}
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

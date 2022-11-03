class appointmentService {
    getTimeSlotsForDay(date) {
        var timeSlots = [];
        var dayStart = new Date(date);
        var dayEnd = new Date(date);

        switch (date.getDay()) {
            case 0: //Sunday
                return timeSlots;
            case 6: //Saturday
                return timeSlots;
            default:
                dayStart.setUTCHours(9, 0, 0, 0);
                dayEnd.setUTCHours(18, 0, 0, 0);
        }
        do {
            timeSlots.push(new Date(dayStart));
            dayStart.setHours(dayStart.getHours(), dayStart.getMinutes() + 30);
        } while (dayStart < dayEnd);

        return timeSlots;
    }
}

module.exports = new appointmentService();

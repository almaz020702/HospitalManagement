const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//angsar.kabdikarim@nu.edu.kz t0ffai9e
//birzhan.zhunusbekov@nu.edu.kz jgp4m6c8
//daulet.maldybayev@nu.edu.kz  rtb5r3pa
//islam.yerzhanuly@nu.edu.kz   3gvz6eh6
//ansar.serikbayev@nu.edu.kz rtb5r3pa
const Doctor = sequelize.define("doctors", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    iin: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    date_of_birth: { type: DataTypes.DATEONLY },
    government_id: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    middle_name: { type: DataTypes.STRING, allowNull: true },
    contact_number: { type: DataTypes.STRING },
    experience_in_year: { type: DataTypes.INTEGER },
    photo: { type: DataTypes.STRING },
    category: {
        type: DataTypes.ENUM(["higher", "first", "second", "third", "nurse"]),
    },
    degree: { type: DataTypes.STRING },
    rating: { type: DataTypes.DECIMAL },
    address: { type: DataTypes.STRING },
});

const Admin = sequelize.define("administrative_staff", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: { type: DataTypes.STRING },
    password: {
        type: DataTypes.STRING,
    },
});

const Patient = sequelize.define("patients", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    iin: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    date_of_birth: { type: DataTypes.DATEONLY },
    government_id: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    middle_name: { type: DataTypes.STRING, allowNull: true },
    blood_group: {
        type: DataTypes.ENUM(["first", "second", "third", "fourth"]),
    },
    emergency_contact_number: { type: DataTypes.STRING },
    contact_number: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    marital_status: {
        type: DataTypes.ENUM(["married", "widowed", "separated", "divorced", "single"]),
    },
});

const Department = sequelize.define("departments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    department_name: {
        type: DataTypes.STRING,
        unique: true,
    },
    department_info: {
        type: DataTypes.STRING,
    },
});

const Service = sequelize.define("services", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    service_name: {
        type: DataTypes.STRING,
        unique: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 30,
    },
});

const DoctorService = sequelize.define("doctorService", {
    price: {
        type: DataTypes.INTEGER,
    },
});

const Appointment = sequelize.define("appointments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
});

const Conversation = sequelize.define("conversation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
});

const Message = sequelize.define("messages", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
    },
});

Department.hasMany(Doctor, { onDelete: "SET NULL" });
Doctor.belongsTo(Department);

Doctor.belongsToMany(Service, { through: DoctorService, onDelete: "CASCADE" });
Service.belongsToMany(Doctor, { through: DoctorService, onDelete: "CASCADE" });

Department.hasMany(Service, { onDelete: "CASCADE" });
Service.belongsTo(Department);

Doctor.hasMany(Appointment);
Appointment.belongsTo(Doctor);
Patient.hasMany(Appointment);
Appointment.belongsTo(Patient);
Service.hasMany(Appointment);
Appointment.belongsTo(Service);

Doctor.belongsToMany(Patient, { through: Conversation });
Patient.belongsToMany(Doctor, { through: Conversation });

Doctor.hasMany(Message);
Message.belongsTo(Doctor);
Patient.hasMany(Message);
Message.belongsTo(Patient);

module.exports = {
    Doctor,
    Admin,
    Patient,
    Department,
    Service,
    DoctorService,
    Appointment,
    Conversation,
    Message,
};

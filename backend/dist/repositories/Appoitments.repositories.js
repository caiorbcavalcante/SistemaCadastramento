"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const Appointment_1 = require("../entities/Appointment");
const app_data_source_1 = require("../app-data-source");
const appointmentRepository = app_data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
class AppointmentRepository {
    constructor() {
        this.getAllAppointments = async () => {
            return await appointmentRepository.find({
                relations: ["user", "barber", "service"]
            });
        };
        this.getAppointment = async (id) => {
            return await this.manager.findOne({
                where: { id_appointment: id },
                relations: ["user", "barber", "service"]
            });
        };
        this.createAppointment = async (data) => {
            const appointment = new Appointment_1.Appointment();
            Object.assign(appointment, data);
            return await this.manager.save(appointment);
        };
        this.updateAppointment = async (id, appointment) => {
            await this.manager.update(id, appointment);
            return await this.getAppointment(id);
        };
        this.deleteAppointment = async (id_appointment) => {
            const result = await this.manager.delete(id_appointment);
            return result.affected !== 0;
        };
        this.getAppointmentsByUser = async (id_user) => {
            return await this.manager.find({
                where: { user: { id_user } },
                relations: ["user", "barber", "service"]
            });
        };
        this.getAppointmentsByBarber = async (id_barber) => {
            return await this.manager.find({
                where: { barber: { id_barber } },
                relations: ["user", "barber", "service"]
            });
        };
        this.manager = app_data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
    }
}
exports.AppointmentRepository = AppointmentRepository;

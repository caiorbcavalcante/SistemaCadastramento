"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const Appointment_1 = require("../entities/Appointment");
const app_data_source_1 = require("../app-data-source");
class AppointmentRepository {
    constructor() {
        this.getAllAppointments = async () => {
            return await this.manager.find();
        };
        this.getAppointment = async (id) => {
            return await this.manager.findOne({
                where: { id_appointment: Number(id) }
            });
        };
        this.createAppointment = async (appointment) => {
            return await this.manager.save(appointment);
        };
        this.updateAppointment = async (id, appointment) => {
            const numericId = Number(id);
            await this.manager.update(numericId, appointment);
            return await this.getAppointment(id);
        };
        this.deleteAppointment = async (id_appointment) => {
            const numericId = Number(id_appointment);
            const result = await this.manager.delete(numericId);
            return result.affected !== 0;
        };
        this.getAppointmentsByUser = async (id_user) => {
            return await this.manager.find({
                where: { user: { id_user } }
            });
        };
        this.getAppointmentsByBarber = async (id_barber) => {
            return await this.manager.find({
                where: { barber: { id_barber } }
            });
        };
        this.manager = app_data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
    }
}
exports.AppointmentRepository = AppointmentRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const Appoitments_repositories_1 = require("../repositories/Appoitments.repositories");
class AppointmentService {
    constructor(appoitmentRepository = new Appoitments_repositories_1.AppointmentRepository()) {
        this.getAppointment = async (id_appointment) => {
            return await this.appoitmentRepository.getAppointment(id_appointment);
        };
        this.getAllAppointments = async () => {
            return await this.appoitmentRepository.getAllAppointments();
        };
        this.createAppointment = async (appointment) => {
            return await this.appoitmentRepository.createAppointment(appointment);
        };
        this.updateAppointment = async (id, appointment) => {
            return await this.appoitmentRepository.updateAppointment(id, appointment);
        };
        this.deleteAppointment = async (id_appointment) => {
            return await this.appoitmentRepository.deleteAppointment(id_appointment);
        };
        this.getAppointmentsByUser = async (id_user) => {
            return await this.appoitmentRepository.getAppointmentsByUser(id_user);
        };
        this.getAppointmentsByBarber = async (id_barber) => {
            return await this.appoitmentRepository.getAppointmentsByBarber(id_barber);
        };
        this.appoitmentRepository = appoitmentRepository;
    }
}
exports.AppointmentService = AppointmentService;

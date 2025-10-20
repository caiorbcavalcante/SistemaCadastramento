"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const Appointment_service_1 = require("../services/Appointment.service");
const date_fns_1 = require("date-fns");
class AppointmentController {
    constructor(appointmentService = new Appointment_service_1.AppointmentService()) {
        this.getAllAppointments = async (request, response) => {
            try {
                const appointments = await this.appointmentService.getAllAppointments();
                if (!appointments || appointments.length === 0) {
                    return response.status(200).json([]);
                }
                const formattedAppointments = appointments.map(app => ({
                    user: app.user.name,
                    barber: app.barber.name,
                    service: app.service.description,
                    price: app.service.price,
                    date: new Date(app.date).toLocaleString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                        dateStyle: "short",
                        timeStyle: "short"
                    })
                }));
                return response.status(200).json({ appointments: formattedAppointments });
            }
            catch (error) {
                console.error("Erro ao listar agendamentos:", error);
                return response.status(500).json({ message: "Erro ao listar agendamentos" });
            }
        };
        this.getAppointment = async (request, response) => {
            try {
                const { id_appointment } = request.params;
                const idNumber = Number(id_appointment);
                const appointment = await this.appointmentService.getAppointment(idNumber);
                if (!appointment) {
                    return response.status(404).json({ message: "Agendamento não encontrado" });
                }
                return response.status(200).json({
                    id_appointment: appointment.id_appointment,
                    userId: appointment.user.id_user,
                    userName: appointment.user.name,
                    userNumber: appointment.user.number,
                    date: appointment.date,
                    description: appointment.service.description,
                    price: appointment.service.price
                });
            }
            catch (err) {
                console.error("Falha ao buscar agendamento:", err);
                return response.status(500).json({ message: "Erro ao buscar agendamento" });
            }
        };
        this.createAppointment = async (request, response) => {
            try {
                const { user, barber, date, service } = request.body;
                if (!user || !barber || !date || !service) {
                    return response.status(400).json({ message: "Todos os campos são obrigatórios" });
                }
                const parsedDate = (0, date_fns_1.parse)(date, "dd/MM/yyyy HH:mm", new Date());
                const appointment = await this.appointmentService.createAppointment({
                    user,
                    barber,
                    service,
                    date: parsedDate
                });
                const formattedDate = new Date(appointment.date).toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    dateStyle: "short",
                    timeStyle: "short"
                });
                // monta o retorno sem o id_appointment
                const responseData = {
                    user: appointment.user,
                    barber: appointment.barber,
                    service: appointment.service,
                    date: formattedDate
                };
                return response.status(201).json({ responseData });
            }
            catch (err) {
                console.error("Erro ao criar agendamento:", err);
                return response.status(500).json({ message: "Erro ao criar agendamento" });
            }
        };
        this.updateAppointment = async (request, response) => {
            try {
                const { id_appointment } = request.params;
                const { user, barber, date, service } = request.body;
                const idNumber = Number(id_appointment);
                const success = await this.appointmentService.updateAppointment(idNumber, { user, barber, date, service });
                if (!success) {
                    return response.status(404).json({ message: "Agendamento não encontrado" });
                }
                return response.status(200).json({ message: "Agendamento atualizado com sucesso" });
            }
            catch (err) {
                console.error("Erro ao atualizar agendamento:", err);
                return response.status(500).json({ message: "Erro ao atualizar agendamento" });
            }
        };
        this.deleteAppointment = async (request, response) => {
            try {
                const { id_appointment } = request.params;
                const success = await this.appointmentService.deleteAppointment(Number(id_appointment));
                if (!success) {
                    return response.status(404).json({ message: "Agendamento não encontrado" });
                }
                return response.status(200).json({ message: "Agendamento deletado com sucesso" });
            }
            catch (err) {
                console.error("Erro ao deletar agendamento:", err);
                return response.status(500).json({ message: "Erro ao deletar agendamento" });
            }
        };
        this.getAppointmentsByUser = async (request, response) => {
            try {
                const { id_user } = request.params;
                if (!id_user) {
                    return response.status(400).json({ message: "ID do usuário não informado" });
                }
                const appointments = await this.appointmentService.getAppointmentsByUser(Number(id_user));
                if (!appointments || appointments.length === 0) {
                    return response.status(200).json([]);
                }
                const appointmentMap = appointments.map(a => ({
                    id_appointment: a.id_appointment,
                    barberId: a.barber.id_barber,
                    barberName: a.barber.name,
                    barberNumber: a.barber.number,
                    date: a.date,
                    id_service: a.service.id_service,
                    description: a.service.description,
                    price: a.service.price
                }));
                return response.status(200).json(appointmentMap);
            }
            catch {
                return response.status(500).json({ message: "Error ao buscar agendamento do usuario" });
            }
        };
        this.getAppointmentsByBarber = async (request, response) => {
            try {
                const { id_barber } = request.params;
                if (!id_barber) {
                    return response.status(200).json([]);
                }
                const appointments = await this.appointmentService.getAppointmentsByBarber(Number(id_barber));
                if (!appointments || appointments.length === 0) {
                    return response.status(200).json([]);
                }
                const appointmentsMap = appointments.map(a => ({
                    id_appointment: a.id_appointment,
                    userId: a.user.id_user,
                    userName: a.user.name,
                    userNumber: a.user.number,
                    date: a.date,
                    description: a.service.description,
                    price: a.service.price
                }));
                return response.status(200).json(appointmentsMap);
            }
            catch {
                return response.status(500).json({ message: "Error ao buscar agendamento do barbeiro" });
            }
        };
        this.appointmentService = appointmentService;
    }
}
exports.AppointmentController = AppointmentController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const express_1 = require("express");
const Appointment_controller_1 = require("../controllers/Appointment.controller");
exports.appointmentRouter = (0, express_1.Router)();
const appointmentController = new Appointment_controller_1.AppointmentController();
// Criar agendamento
exports.appointmentRouter.post("/appointments", appointmentController.createAppointment);
// Listar todos os agendamentos
exports.appointmentRouter.get("/appointments", appointmentController.getAllAppointments);
// Buscar agendamento por id
exports.appointmentRouter.get("/appointments/:id_appointment", appointmentController.getAppointment);
// Atualizar agendamento
exports.appointmentRouter.put("/appointments/:id_appointment", appointmentController.updateAppointment);
// Deletar agendamento
exports.appointmentRouter.delete("/appointments/:id_appointment", appointmentController.deleteAppointment);
exports.appointmentRouter.get("/appointments/barber/:id_barber", appointmentController.getAppointmentsByBarber);
exports.appointmentRouter.get("/appointments/user/:id_user", appointmentController.getAppointmentsByUser);

import { Router } from 'express'
import { AppointmentController } from '../controllers/Appointment.controller'

export const appointmentRouter = Router()

const appointmentController = new AppointmentController()

// Criar agendamento
appointmentRouter.post("/appointments", appointmentController.createAppointment)

// Listar todos os agendamentos
appointmentRouter.get("/appointments", appointmentController.getAllAppointments)

// Buscar agendamento por id
appointmentRouter.get("/appointments/:id_appointment", appointmentController.getAppointment)

// Atualizar agendamento
appointmentRouter.put("/appointments/:id_appointment", appointmentController.updateAppointment)

// Deletar agendamento
appointmentRouter.delete("/appointments/:id_appointment", appointmentController.deleteAppointment)

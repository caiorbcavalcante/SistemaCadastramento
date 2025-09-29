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
appointmentRouter.patch("/appointments/:id_appointment", appointmentController.updateAppointment)

// Deletar agendamento
appointmentRouter.delete("/appointments/:id_appointment", appointmentController.deleteAppointment)

appointmentRouter.get("/appointments/barber/:id_barber", appointmentController.getAppointmentsByBarber)
appointmentRouter.get("/appointments/user/:id_user", appointmentController.getAppointmentsByUser)


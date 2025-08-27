import { Router } from 'express'
import { AppointmentController } from '../controllers/Appointment.controller'

export const appointmentRouter = Router()

const appointmentController = new AppointmentController()

appointmentRouter.post("/appointments", appointmentController.createAppointment)
appointmentRouter.get("/appoinments", appointmentController.getAllAppointments) // Listar todos os agendamentos
appointmentRouter.get("/appointments", appointmentController.getAppointment) // Listar appointment específico através do id
appointmentRouter.put("/appointments:id", appointmentController.createAppointment)
appointmentRouter.delete("/appointments:id", appointmentController.deleteAppointment)

import { Router } from 'express'
import { AppointmentController } from '../controllers/Appointment.controller'

export const appointmentRouter = Router()

const appointmentController = new AppointmentController()

appointmentRouter.post("/appointments", appointmentController.createAppointment)
appointmentRouter.get("/appoinments", appointmentController.getAllAppointments) 
appointmentRouter.get("/appointments:id_appointments", appointmentController.getAppointment) 
appointmentRouter.put("/appointments:id_appointments", appointmentController.createAppointment)
appointmentRouter.delete("/appointments:id_appointments", appointmentController.deleteAppointment)
//criar com op rsto do con rtroler que falta
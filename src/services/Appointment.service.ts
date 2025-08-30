import { Appointment } from "../entities/Appointment";
import { AppointmentRepository } from "../repositories/Appoitments.repositories";


export class AppointmentService {
     appoitmentRepository:AppointmentRepository

     constructor(appoitmentRepository = new AppointmentRepository()){
        this.appoitmentRepository = appoitmentRepository
     }

     getAppointment = async(id_appointment:string):Promise<Appointment | null> => {
        return await this.appoitmentRepository.getAppointment(id_appointment) 
     }

     getAllAppointments = async(): Promise <Appointment[] | null> => {
        return await this.appoitmentRepository.getAllAppointments()
     }

     createAppointment = async(appointment: Appointment): Promise <Appointment> => {
        return await this.appoitmentRepository.createAppointment(appointment)
     }

     updateAppointment = async(id:string, appointment: Appointment): Promise <Appointment | null> => {
        return await this.appoitmentRepository.updateAppointment(id, appointment)
     }

     deleteAppointment = async(id_appointment:string): Promise <boolean> => {
        return await this.appoitmentRepository.deleteAppointment(id_appointment)
     }

     getAppointmentsByUser = async (id_user:number):Promise<Appointment[] | null> => {
        return await this.appoitmentRepository. getAppointmentsByUser(id_user)
    }

    getAppointmentsByBarber = async (id_barber:number):Promise<Appointment[] | null> => {
        return await this.appoitmentRepository.getAppointmentsByBarber(id_barber)
    }
}

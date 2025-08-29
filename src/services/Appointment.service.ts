import { Appointment } from "../entities/Appointment";
import { AppoitmentRepository } from "../repositories/Appoitments.repositories";




export class AppointmentService {
     appoitmentRepository:AppoitmentRepository

     constructor(appoitmentRepository = new AppointmentRepository()){
        this.appoitmentRepository = appoitmentRepository
     }






     getAppointmentsByUser = async (id_user:number):Promise<Appointment[] | null> => {
        return await this.appoitmentRepository. getAppointmentsByUser(id_user)
    }

    getAppointmentsByBarber = async (id_barber:number):Promise<Appointment[] | null> => {
        return await this.appoitmentRepository.getAppointmentsByBarber(id_barber)
    }


}

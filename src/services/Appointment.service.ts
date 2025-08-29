import { Appointment } from "../entities/Appointment";
import { AppointmentRepository } from "../repositories/Appoitments.repositories";




export class AppointmentService {
     appoitmentRepository:AppointmentRepository

     constructor(appoitmentRepository = new AppointmentRepository()){
        this.appoitmentRepository = appoitmentRepository
     }

     getAll = async():Promise<Appointment[] | null> => {
        return await this this.appoitmentRepository.get
     }






     getAppointmentsByUser = async (id_user:number):Promise<Appointment[] | null> => {
        return await this.appoitmentRepository. getAppointmentsByUser(id_user)
    }

    getAppointmentsByBarber = async (id_barber:number):Promise<Appointment[] | null> => {
        return await this.appoitmentRepository.getAppointmentsByBarber(id_barber)
    }


}

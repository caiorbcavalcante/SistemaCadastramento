import { Appointment } from "../entities/Appointment";
import { UserRepository } from "../repositories/Users.repositories";
import { UserService } from "./Users.service";



export class AppointmentService {
     userRepository:UserRepository

     constructor(userRepository = new UserRepository()){
        this.userRepository = userRepository
     }

    
     getAppointmentsByUser = async (id_user:number):Promise<Appointment[] | null> => {
        return await this.userRepository.getAppointmentsByUser(id_user)
    }

    getAppointmentsByBarber = async (id_barber:number):Promise<Appointment[] | null> => {
        return await this.userRepository.getAppointmentsByBarber(id_barber)
    }


}

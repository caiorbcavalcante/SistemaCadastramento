import { Repository } from "typeorm";
import { Appointment } from "../entities/Appointment";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";


export class AppointmentRepository{
    private manager:Repository<Appointment>

    constructor(){
        this.manager = AppDataSource.getRepository(Appointment)
    }

    getAllAppointments = async(): Promise<Appointment[] | null> => {
        return await this.manager.find();
    }

    getAppointment = async(id: string): Promise <Appointment | null> => {
        return await this.manager.findOne({
            where: { id_Appointment: id_Appointment } 
        })
    }




    getAppointmentsByUser = async(id_user:number):Promise<Appointment[] | null> =>{
        return await this.manager.find({
            where:{user:{id_user}}
        })
    }
    getAppointmentsByBarber = async(id_barber:number):Promise<Appointment[] | null>{
        return await this.manager.find({
            where:{barber:{id_barber}}
        })
    }
}
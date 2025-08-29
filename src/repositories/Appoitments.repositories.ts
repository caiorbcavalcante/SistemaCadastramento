import { Repository } from "typeorm";
import { Appointment } from "../entities/Appointment";
import { AppDataSource } from "../app-data-source";
import { User } from "../entities/User";


export class AppoitmentRepository{
    private manager:Repository<Appointment>

    constructor(){
        this.manager = AppDataSource.getRepository(Appointment)
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
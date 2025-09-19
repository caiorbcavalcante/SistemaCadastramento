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
            where: {id_appointment: Number(id)}
        })
    }

    createAppointment = async (data: Partial<Appointment>): Promise<Appointment> => {
    const appointment = new Appointment();
    Object.assign(appointment, data);
    return await this.manager.save(appointment);
};



    updateAppointment = async(id: string, appointment: Partial<Appointment>): Promise <Appointment | null> => {
        const numericId = Number(id)
        await this.manager.update(numericId, appointment)
        return await this.getAppointment(id)
    }

    deleteAppointment = async(id_appointment:string): Promise <boolean> => {
        const numericId = Number(id_appointment)
        const result = await this.manager.delete(numericId)
        return result.affected !== 0
    }

    getAppointmentsByUser = async(id_user:number):Promise<Appointment[] | null> =>{
        return await this.manager.find({
            where:{user:{id_user}},
            relations: ["user", "barber", "service"]
        })
    }
    getAppointmentsByBarber = async(id_barber:number):Promise<Appointment[] | null> =>{
        return await this.manager.find({
            where:{barber:{id_barber}},
            relations: ["user", "barber", "service"]
        })
    }
}
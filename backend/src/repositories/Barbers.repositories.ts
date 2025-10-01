import { Barber } from "../entities/Barber";
import { AppDataSource } from "../app-data-source"
import { Repository } from "typeorm";

export class BarberRepository{
    private manager: Repository<Barber>

    constructor ()
    {this.manager = AppDataSource.getRepository(Barber)}

    getBarber = async (id_barber:number) : Promise<Barber| null> => {
        return await this.manager.findOne ({
            where: {id_barber:id_barber}
        })
    }

    getAllBarbers = async (): Promise<Barber[] | null > =>{
        return await this.manager.find({
            select: ["id_barber", "name", "email", "number", "role", "adminplus"]
        });
    }

    createBarber = async(barber:Barber) : Promise <Barber> =>{
        return await this.manager.save(barber);
    }

    updateBarber = async(id_barber: number, name: string, email: string, password?: string, number:string, adminplus:boolean): Promise < Barber | null > =>{
        await this.manager.update({id_barber}, {name, email, password,number, adminplus})
        return this.manager.findOneBy({id_barber})
    } 

    deleteBarber = async(id_barber: number): Promise < boolean > =>{
        const result = await this.manager.delete({ id_barber })
        return result.affected !== 0
    }

    getAutenticationByEmailPassword = async(email:string): Promise < Barber | null > =>{
        return await this.manager.findOne({
            where: {email}
        })
    }

    findByEmail = async(email: string): Promise<Barber | null> => {
        return this.manager.findOne({
            where: {email}
        })
    }
}
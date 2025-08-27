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
        return await this.manager.find();
    }

    createBarber = async(barber:Barber) : Promise <Barber> =>{
        return await this.manager.save(barber);
    }
}
import { AppDataSource } from "../app-data-source"
import { Barber } from "../entities/Barber"
import { BarberRepository } from "../repositories/Barbers.repositories"

export class BarbersService{
    getAllBarbers() {
        throw new Error('Method not implemented.')
    }

    barberRepository:BarberRepository

    constructor(barberRepository = new BarberRepository())
    {
        this.barberRepository = barberRepository
    }

    getBarber = async (id_barber:number):Promise<Barber | null> =>{
    return await this.barberRepository.getBarber(id_barber)
    }

    getAllBarbers= async(id_barber:Number, email:string, password:string):Promise{

    }
}
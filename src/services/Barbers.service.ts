import { AppDataSource } from "../app-data-source"
import { Barber } from "../entities/Barber"
import { BarberRepository } from "../repositories/Barbers.repositories"

export class BarbersService{
    barberRepository:BarberRepository

    constructor(barberRepository = new BarberRepository())
    {
        this.barberRepository = barberRepository
    }

    getBarber = async (id_barber:number):Promise<Barber | null> =>{
    return await this.barberRepository.getBarber(id_barber)
    }

<<<<<<< HEAD
    getAllBarbers= async(id_barber:Number, email:string, password:string): Promise{
        
=======
    getAllBarbers = async(): Promise<Barber[] | null> =>{
        return await this.barberRepository.getAllBarbers()
>>>>>>> 6b507e3372b4d1bd73a7894b226f76a96db81f54
    }

    createBarber = async(name:string, email:string, password:string): Promise<Barber> =>{
        const barber = new Barber(name, email, password)
        return await this.barberRepository.createBarber(barber as Barber)
    }
}





import { AppDataSource } from "../app-data-source"
import { Barber } from "../entities/Barber"
import { BarberRepository } from "../repositories/Barbers.repositories"
import jwt from "jsonwebtoken";

export class BarbersService{
    barberRepository:BarberRepository

    constructor(barberRepository = new BarberRepository())
    {
        this.barberRepository = barberRepository
    }

    getBarber = async (id_barber:number):Promise<Barber | null> =>{
    return await this.barberRepository.getBarber(id_barber)
    }

    getAllBarbers = async(): Promise<Barber[] | null> =>{
        return await this.barberRepository.getAllBarbers()
    }

    createBarber = async(name:string, email:string, password:string): Promise<Barber> =>{
        const barber = new Barber(name, email, password)
        return await this.barberRepository.createBarber(barber as Barber)
    }

    updateBarber = async(id:number, name: string, email:string, password:string): Promise<Barber | null> =>{
        return await this.barberRepository.updateBarber(id, name, email, password)
    }

    deleteBarber = async(id_barber: number): Promise <boolean> =>{
        return await this.barberRepository.deleteBarber(id_barber);
    }

    getAutenticationByEmailPassword = async(email:string, password:string):Promise<Barber | null>=>{
            return await this.barberRepository.getAutenticationByEmailPassword(email,password)
        }

    getToken = async(email: string, password: string): Promise<string> => {

        const barber = await this.getAutenticationByEmailPassword(email, password)
        if (!barber) {
            throw new Error ("Usuário ou senha inválida")
        }

        const token = jwt.sign(
        {id_barber:barber.id_barber, email:barber.email, role:"barber"},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
    )

    return token
    }



    
}





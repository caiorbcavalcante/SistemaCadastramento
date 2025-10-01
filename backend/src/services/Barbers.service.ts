import { AppDataSource } from "../app-data-source"
import { Barber } from "../entities/Barber"
import { BarberRepository } from "../repositories/Barbers.repositories"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError";

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

    createBarber = async(name:string, email:string, password:string, number:string): Promise<Barber> =>{
        const existingBarber = await this.barberRepository.findByEmail(email)
        if (existingBarber){throw new EmailAlreadyExistsError()}

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt)

        const barber = new Barber(name, email, passwordHash, number)
        return await this.barberRepository.createBarber(barber as Barber)

        // const barber = new Barber(name, email, password,number)
        // return await this.barberRepository.createBarber(barber as Barber) // SE DER RUIM SO RETORNAR AQ
    }

    updateBarber = async(id:number, name: string, email:string, password:string, number:string, adminplus:boolean): Promise<Barber | null> =>{
        let passwordHash: string | undefined;
        if (password) {
            const salt = await bcrypt.genSalt(12);
            passwordHash = await bcrypt.hash(password, salt)
        }
        return await this.barberRepository.updateBarber(id, name, email, passwordHash, number, adminplus)
    }

    deleteBarber = async(id_barber: number): Promise <boolean> =>{
        return await this.barberRepository.deleteBarber(id_barber);
    }

    getAutenticationByEmailPassword = async(email:string):Promise<Barber | null>=>{
            return await this.barberRepository.getAutenticationByEmailPassword(email)
        }

    getToken = async(email: string, password: string): Promise<string> => {

        const barber = await this.getAutenticationByEmailPassword(email)
        if (!barber) {
            throw new Error ("Usuário ou senha inválida")
        }

        const checkPassword = await bcrypt.compare(password, barber.password)

        const token = jwt.sign(
        {id_barber:barber.id_barber, email:barber.email, role:"barber"},
        process.env.JWT_SECRET as string,
        {expiresIn: "1h"}
    )

    return token
    }
    
}





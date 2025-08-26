import { AppDataSource } from "../app-data-source"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/Users.repositories"

export class UserService{
    getAllUser() {
        throw new Error('Method not implemented.')
    }

    userRepository:UserRepository

    constructor(userRepository = new UserRepository())
    {
        this.userRepository = userRepository
    }

    getUser = async (id_user:number):Promise<User | null> =>{
    return await this.userRepository.getUser(id_user)
    }

    getAllUser= async(id_user:Number, email:string, password:string):Promise{

    }
}
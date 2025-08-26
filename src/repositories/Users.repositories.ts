import { User } from "../entities/User";
import { AppDataSource } from "../app-data-source"
import { Repository } from "typeorm";

export class UserRepository{

    private manager:Repository<User>


    constructor()    
    {this.manager =  AppDataSource.getRepository(User)}



    getUser = async (id_user:number):Promise<User | null> =>  {
      return  await this.manager.findOne({
    where:{ id_user:id_user} })
}

    getAllUser= async():Promise<User[] | null> =>{
        return await this.manager.find()
    }
    createUser =async(user:User): Promise<User> =>{
        return await this.manager.save(user)
    }
}
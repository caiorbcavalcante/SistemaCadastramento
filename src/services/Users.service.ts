import { UserRepository } from "../repositories/Users.repositories"

export class UserService{

    userRepository:UserRepository

    constructor(userRepository = new UserRepository())
    {
        this.userRepository = userRepository
    }

    getUser = async (id_user:string):Promise<User> =>{
    return await this.userRepository.getUser(id_user)


        console.log("me come")
    }
}
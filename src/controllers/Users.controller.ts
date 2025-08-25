
import { Response, Request } from 'express'
import { UserService } from '../services/Users.service'


export class UserController{
    userService:UserService

    constructor(userService = new UserService()){
        this.userService = userService
    }


    getUser = async (request:Request, response:Response) => {
        try{ 
        
        const id_user = (request as any).id_user

        if(!id_user){
            return response.status(401).json({message:"'Usuário não autenticado'"})
        }

        const user = await this.userService.getUser(id_user)

        if(!user){
            return response.status(404).json({message:"Usuário não encontrado"})
        }

        return response.status(200).json({message:"Usuario encontrado"})
    }catch{
          return response.status(500).json({ message: "Erro ao buscar usuário"});
    }
    }



    getUserId = async (request:Request<{ user: string }>, response:Response) => {
        const {id_user} = request.params
        const user = await this.userService.getUserId(id_user)

        if(user){ 

       return response.status(200).json({ message: "usuario listado", id_user})
        }
    }

}



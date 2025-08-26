
import { Response, Request } from 'express'
import { UserService } from '../services/Users.service'


export class UserController{
    userService:UserService

    constructor(userService = new UserService()){
        this.userService = userService
    }


    getUser = async (request:Request, response:Response) => {
        try{ 
        
        const {id_user} = request.params

        if(!id_user){
            return response.status(401).json({message:"'Usuário não autenticado'"})
        }

        const user = await this.userService.getUser(parseInt(id_user))

        if(!user){
            return response.status(404).json({message:"Usuário não encontrado"})
        }

        return response.status(200).json({user:user?.id_user,
            name:user?.name,
            email: user?.email})
    }catch{
          return response.status(500).json({ message: "Erro ao buscar usuário"});
    }
    }



    getAllUser= async (request:Request, response:Response) => {
      try{ 

        const users = await this.userService.getAllUser()

        return response.status(200).json({users})
      }catch{
        return  response.status(500).json({message:"erro ao listar usuarios"})
      }
    }

}



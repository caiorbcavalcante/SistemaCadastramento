import { Response, Request,  } from 'express'
import { UserService } from '../services/Users.service'
import { EmailAlreadyExistsError } from '../errors/emailAlreadyExistsError'

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
          return response.status(500).json({ message: "Erro ao buscar usuário"})
    }
    }



     getAllUser = async (request: Request, response: Response) => {
        try {
            const users = await this.userService.getAllUser()

            if (!users || users.length === 0) {
             return response.status(404).json({ message: "Nenhum usuário encontrado" })
        }

        const usersMap = users.map(user => ({
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            number:user.number
        }))

        return response.status(200).json({ users: usersMap })
    } catch (error) {
        console.error(error)
        return response.status(500).json({ message: "Erro ao listar usuários" })
    }
}

    createUser= async (request: Request, response: Response) => {
        try{

            const user = request.body
            if(!user.name || !user.email || !user.password || !user.number){
                return response.status(400).json({message:"Nome,email, senha e número são obrigatorios"})
            }
            await this.userService.createUser(user.name, user.email, user.password, user.number)
            return response.status(201).json({message:"Usuario criado com sucesso"})
        }catch (error) {
            if (error instanceof EmailAlreadyExistsError){
                return response.status(409).json({ message: "Este email já foi cadastrado em outra conta."})
            }
            return response.status(500).json({message:"Nãoo foi possiviel criar um usuario"})
        }
    }

    updateUser = async (request:Request, response:Response) =>{
        try{
            const id = Number(request.params.id_user)
            const user = request.body

            if (!user.name || !user.email || !user.password || !user.number) {
            return response.status(400).json({ message: "Nome, email e senha são obrigatórios" })
        }

            const updateUser = await this.userService.updateUser(id, user.name, user.email, user.password, user.number)
            if(!updateUser){
            return response.status(404).json({message:"Usuario inexistente"})
        }
            return response.status(200).json({message:"Usuario atualizado com sucesso", 
                name:updateUser?.name, 
                email:updateUser?.email,
                number:updateUser?.number})

        }catch{
            return response.status(500).json({message:"Não foi possiviel atualizar um usuario"})
        }
    }
    deleteUser = async (request: Request, response: Response) => {
    try {
        const { id_user } = request.params

        if (!id_user) {
            return response.status(400).json({ message: "ID do usuário não informado" })
        }

        const deleted = await this.userService.deleteUser(Number(id_user))

        if (!deleted) {
            return response.status(404).json({ message: "Usuário não encontrado" })
        }

        return response.status(200).json({ message: "Usuário deletado com sucesso" })
    } catch {
        return response.status(500).json({ message: "Erro ao deletar usuário" })
    }
}
    getToken = async(request:Request, response:Response)=>{
        try{
            const {email,password} = request.body
            if(!email || !password){
                return response.status(400).json({message:"Os campos email e senha são obrigatorios"})
            }
           const token = await this.userService.getToken(email,password)
           
        return response.status(200).json({message:"Login efetuado com sucesso", token})
        }catch{
             return response.status(500).json({ message: "Erro ao logar" })
        }
    }


}



import { Response, Request } from 'express'
import { BarbersService } from '../services/Barbers.service'
import { EmailAlreadyExistsError } from '../errors/emailAlreadyExistsError'

export class BarbersController{
    barbersService:BarbersService

    constructor(barbersService = new BarbersService()){
        this.barbersService = barbersService
    }


    getBarber = async (request:Request, response:Response) => {
        try{ 
        
        const {id_barber} = request.params

        if(!id_barber){
            return response.status(401).json({message:"'Barbeiro não autenticado'"})
        }

        const barber = await this.barbersService.getBarber(parseInt(id_barber))

        if(!barber){
            return response.status(404).json({message:"Barbeiro não encontrado"})
        }

        return response.status(200).json({barber:barber?.id_barber,
            name:barber?.name,
            email: barber?.email,
            number:barber?.number,
            adminplus:barber?.adminplus
          })
    }catch{
          return response.status(500).json({ message: "Erro ao buscar barbeiro"});
    }
    }

    getAllBarbers= async (request:Request, response:Response) => {
      try{ 

        const barbers = await this.barbersService.getAllBarbers()

        return response.status(200).json({barbers})
      }catch{
        return  response.status(500).json({message:"erro ao listar barbeiros"})
      }
    }

    createBarber = async(request:Request, response: Response) =>{
      try {
        const barber = request.body

        if (!barber.name || !barber.email || !barber.password || !barber.number){
          return response.status(400).json({message: "Necessário nome, senha, email e número"})
        }

        await this.barbersService.createBarber(barber.name, barber.email, barber.password, barber.number)
        return response.status(201).json({message: "Usuário de barbeiro cadastrado com sucesso! "})
      } catch (error) {
        if (error instanceof EmailAlreadyExistsError){
          return response.status(409).json({message: "Este email já foi cadastrado em outra conta."})
        }
        return response.status(500).json({message: "Erro ao criar usuário de barbeiro"})
      }
    }

    updateBarber = async(request:Request, response: Response) => {
      try {

        const id = Number(request.params.id_barber)
        const barber = request.body

        if (!barber || Object.keys(barber).length === 0){
          return response.status(400).json({message: "Nenhuma mudança feita"})
        }

        const updateBarber = await this.barbersService.updateBarber(id, barber.name, barber.email, barber.password,barber.number, barber.adminplus)

        if (!updateBarber){
          return response.status(404).json({message: "Conta de barbeiro não encontrada"})
        } return response.status(200).json({message: "Conta de barbeiro atualizada com sucesso!",
          name:updateBarber?.name,
          email:updateBarber?.email,
          number:updateBarber?.number,
          adminplus:updateBarber?.adminplus
        })


      } catch{
        return response.status(500).json({message: "Erro ao atualizar usuário de barbeiro"})
      }
    }

    deleteBarber = async (request: Request, response: Response) => {
      try {
        const {id_barber} = request.params

        if (!id_barber){
          return response.status(400).json({message: "ID do usuário de barbeiro não informado"})
        }

        const deleted = await this.barbersService.deleteBarber(Number(id_barber))

        if(!deleted) {
          return response.status(404).json({message: "Usuário de barbeiro não encontrado"})
        }

        return response.status(200).json({message: "Usuário de barbeiro deletado com sucesso!"})

      } catch {
        return response.status(500).json({message: "Erro ao deletar usuário de barbeiro"})
      }
    }

    getToken = async (request: Request, response: Response) => {
      try {
        const {email, password} = request.body

        if (!email || !password) {
          return response.status(400).json({message: "Insira email e senha de usuário de barbeiro"})}

          const token = await this.barbersService.getToken(email, password)
          return response.status(200).json({message: "Login efetuado com sucesso!", token})
      } catch {
        return response.status(500).json({message: "Erro em tentativa de login"})
      }
    }

    

}



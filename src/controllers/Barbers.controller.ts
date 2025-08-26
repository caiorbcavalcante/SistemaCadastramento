import { Response, Request } from 'express'
import { BarbersService } from '../services/Barbers.service'

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
            email: barber?.email})
    }catch{
          return response.status(500).json({ message: "Erro ao buscar barbeiro"});
    }
    }



    getAllBarbers= async (request:Request, response:Response) => {
      try{ 

        const barbers = await this.barbersService.getAllUser()

        return response.status(200).json({barbers})
      }catch{
        return  response.status(500).json({message:"erro ao listar barbeiros"})
      }
    }

}



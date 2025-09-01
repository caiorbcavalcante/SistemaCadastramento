import { Response, Request } from 'express'
import { ServicesServices } from '../services/Services.services'

export class ServicesController{
    servicesServices:ServicesServices

    constructor (servicesServices = new ServicesServices){
        this.servicesServices = servicesServices;
    }

    getService = async (request: Request, response: Response) => {
        try {
            const {id_service} = request.params

            if (!id_service) {
                return response.status(401).json({message: "Serviço não autenticado"})
            }
            
            const service = await this.servicesServices.getService(parseInt(id_service))

            if (!service) {
                return response.status(404).json({message: "Serviço não encontrado"})
            }

            return response.status(200).json({
                service:service?.id_service,
                description:service?.description,
                price:service?.price
            })
        } catch {
            return response.status(500).json({message: "Erro ao buscar serviço"})
        }
    }

    getAllServices = async (request: Request, response: Response) => {
        try {
            const services = await this.servicesServices.getAllServices()
            return response.status(200).json({services})

        } catch {
            return response.status(500).json({message: "Erro ao listar serviços disponíveis"})
        }
    }

    createService = async (request: Request, response: Response) =>{
        try {
            const service = request.body;

            if (!service.description || !service.price){
                return response.status(400).json({message: "Necessário descrição e preço para serviço"})
            }

            await this.servicesServices.createService(service.description, service.price)
            return response.status(201).json({message: "Serviço criado com sucesso!"})
        } catch {
            return response.status(500).json({message: "Erro ao criar novo serviço"})
        }
    }

    updateService = async(request: Request, response: Response) => {
        try {
            const id = Number(request.params.id_service)
            const service = request.body

            if (!service.description || !service.price) {
                return response.status(400).json({message: "Necessário descrição e preço para serviço"})
            }

            const updateService = await this.servicesServices.updateService(id, service.description, service.price)
            if (!updateService){
                return response.status(404).json({message: "Serviço não encontrado"})
            }

            return response.status(200).json({message: "Serviço atualizado com sucesso!", description:updateService?.description, price:updateService?.price})
        } catch {
            return response.status(500).json({message: "Erro ao atualizar serviço"})
        }
    }

    deleteService = async(request: Request, response: Response) => {
        try {
            const {id_service} = request.params

            if (!id_service) {
                return response.status(400).json({message: "ID de serviço não informado"})
            }

            const deleted = await this.servicesServices.deleteService(Number(id_service));

            if (!deleted){
                return response.status(404).json({message: "Serviço não encontrado"})
            }

            return response.status(200).json({message: "Serviço deletado com sucesso!"})
        } catch{
            return response.status(500).json({message: "Erro ao deletar serviço"})
        }
    }
}
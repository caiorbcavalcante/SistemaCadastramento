"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesController = void 0;
const Services_services_1 = require("../services/Services.services");
class ServicesController {
    constructor(servicesServices = new Services_services_1.ServicesServices) {
        this.getService = async (request, response) => {
            try {
                const { id_service } = request.params;
                if (!id_service) {
                    return response.status(401).json({ message: "Serviço não autenticado" });
                }
                const service = await this.servicesServices.getService(parseInt(id_service));
                if (!service) {
                    return response.status(404).json({ message: "Serviço não encontrado" });
                }
                return response.status(200).json({
                    service: service?.id_service,
                    description: service?.description,
                    price: service?.price
                });
            }
            catch {
                return response.status(500).json({ message: "Erro ao buscar serviço" });
            }
        };
        this.getAllServices = async (request, response) => {
            try {
                const services = await this.servicesServices.getAllServices();
                return response.status(200).json({ services });
            }
            catch {
                return response.status(500).json({ message: "Erro ao listar serviços disponíveis" });
            }
        };
        this.createService = async (request, response) => {
            try {
                const service = request.body;
                if (!service.description || !service.price) {
                    return response.status(400).json({ message: "Necessário descrição e preço para serviço" });
                }
                await this.servicesServices.createService(service.description, service.price);
                return response.status(201).json({ message: "Serviço criado com sucesso!" });
            }
            catch {
                return response.status(500).json({ message: "Erro ao criar novo serviço" });
            }
        };
        this.updateService = async (request, response) => {
            try {
                const id = Number(request.params.id_service);
                const service = request.body;
                if (!service.description || !service.price) {
                    return response.status(400).json({ message: "Necessário descrição e preço para serviço" });
                }
                const updateService = await this.servicesServices.updateService(id, service.description, service.price);
                if (!updateService) {
                    return response.status(404).json({ message: "Serviço não encontrado" });
                }
                return response.status(200).json({ message: "Serviço atualizado com sucesso!", description: updateService?.description, price: updateService?.price });
            }
            catch {
                return response.status(500).json({ message: "Erro ao atualizar serviço" });
            }
        };
        this.deleteService = async (request, response) => {
            try {
                const { id_service } = request.params;
                if (!id_service) {
                    return response.status(400).json({ message: "ID de serviço não informado" });
                }
                const deleted = await this.servicesServices.deleteService(Number(id_service));
                if (!deleted) {
                    return response.status(404).json({ message: "Serviço não encontrado" });
                }
                return response.status(200).json({ message: "Serviço deletado com sucesso!" });
            }
            catch {
                return response.status(500).json({ message: "Erro ao deletar serviço" });
            }
        };
        this.servicesServices = servicesServices;
    }
}
exports.ServicesController = ServicesController;

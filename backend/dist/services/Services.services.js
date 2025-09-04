"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesServices = void 0;
const Service_1 = require("../entities/Service");
const Services_repositories_1 = require("../repositories/Services.repositories");
class ServicesServices {
    constructor(serviceRepository = new Services_repositories_1.ServiceRepository()) {
        this.getService = async (id_service) => {
            return await this.serviceRepository.getService(id_service);
        };
        this.getAllServices = async () => {
            return await this.serviceRepository.getAllServices();
        };
        this.createService = async (description, price) => {
            const service = new Service_1.Service(description, price);
            return await this.serviceRepository.createService(service);
        };
        this.updateService = async (id, description, price) => {
            return await this.serviceRepository.updateService(id, description, price);
        };
        this.deleteService = async (id_service) => {
            return await this.serviceRepository.deleteService(id_service);
        };
        this.serviceRepository = serviceRepository;
    }
}
exports.ServicesServices = ServicesServices;

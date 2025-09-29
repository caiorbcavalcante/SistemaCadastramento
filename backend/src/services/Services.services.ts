import { AppDataSource } from "../app-data-source";
import { Service } from "../entities/Service";
import { ServiceRepository } from "../repositories/Services.repositories";

export class ServicesServices{
    serviceRepository:ServiceRepository;

    constructor(serviceRepository = new ServiceRepository()){
        this.serviceRepository = serviceRepository
    }

    getService = async(id_service:number): Promise<Service | null> => {
        return await this.serviceRepository.getService(id_service);
    }

    getAllServices = async(): Promise <Service[] | null> => {
        return await this.serviceRepository.getAllServices();
    }

    createService = async(description:string, price:number):Promise<Service> =>{
        const service = new Service(description, price)
        return await this.serviceRepository.createService(service as Service);
    }

    updateService = async(id: number, description: string, price:number): Promise<Service | null> => {
        return await this.serviceRepository.updateService(id, description, price);
    }

    deleteService = async(id_service: number): Promise<boolean> => {
        return await this.serviceRepository.deleteService(id_service);
    }

    /*
    getServiceByUser = async(id_user: number): Promise<Service [] | null> => {
        return await this.serviceRepository.getServiceByUser(id_user)
    }

    getServiceByBarber = async(id_barber: number): Promise<Service [] | null> => {
        return await this.serviceRepository.getServiceByBarber(id_barber)
    }
    */

}
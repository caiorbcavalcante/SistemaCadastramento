import { Service } from "../entities/service";
import { AppDataSource } from "../app-data-source"
import { Repository } from "typeorm";

export class ServiceRepository{

    private manager: Repository<Service>

    constructor() {
        this.manager = AppDataSource.getRepository(Service)
    }

    getService = async(id_service:number):Promise<Service | null> => {
        return await this.manager.findOne({
            where:{id_service:id_service}
        })
    }

    getAllServices = async():Promise<Service[] | null> =>{
        return await this.manager.find()
    }

    createService = async(service:Service): Promise<Service> => {
        return await this.manager.save(service)
    }

    updateService = async(id_service:number, description:string, price:number): Promise<Service | null> =>{
        await this.manager.update({id_service}, {description, price})
        return this.manager.findOneBy({id_service})
    }

    deleteService = async(id_service:number): Promise<boolean> =>{
        const result = await this.manager.delete({ id_service })
        return result.affected !== 0
    }
}
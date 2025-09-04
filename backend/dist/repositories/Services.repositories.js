"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const Service_1 = require("../entities/Service");
const app_data_source_1 = require("../app-data-source");
class ServiceRepository {
    constructor() {
        this.getService = async (id_service) => {
            return await this.manager.findOne({
                where: { id_service: id_service }
            });
        };
        this.getAllServices = async () => {
            return await this.manager.find();
        };
        this.createService = async (service) => {
            return await this.manager.save(service);
        };
        this.updateService = async (id_service, description, price) => {
            await this.manager.update({ id_service }, { description, price });
            return this.manager.findOneBy({ id_service });
        };
        this.deleteService = async (id_service) => {
            const result = await this.manager.delete({ id_service });
            return result.affected !== 0;
        };
        this.manager = app_data_source_1.AppDataSource.getRepository(Service_1.Service);
    }
}
exports.ServiceRepository = ServiceRepository;

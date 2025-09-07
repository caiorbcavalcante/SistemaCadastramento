"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarberRepository = void 0;
const Barber_1 = require("../entities/Barber");
const app_data_source_1 = require("../app-data-source");
class BarberRepository {
    constructor() {
        this.getBarber = async (id_barber) => {
            return await this.manager.findOne({
                where: { id_barber: id_barber }
            });
        };
        this.getAllBarbers = async () => {
            return await this.manager.find();
        };
        this.createBarber = async (barber) => {
            return await this.manager.save(barber);
        };
        this.updateBarber = async (id_barber, name, email, password) => {
            await this.manager.update({ id_barber }, { name, email, password });
            return this.manager.findOneBy({ id_barber });
        };
        this.deleteBarber = async (id_barber) => {
            const result = await this.manager.delete({ id_barber });
            return result.affected !== 0;
        };
        this.getAutenticationByEmailPassword = async (email, password) => {
            return await this.manager.findOne({
                where: { email, password }
            });
        };
        this.manager = app_data_source_1.AppDataSource.getRepository(Barber_1.Barber);
    }
}
exports.BarberRepository = BarberRepository;

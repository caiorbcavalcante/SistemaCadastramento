"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
const app_data_source_1 = require("../app-data-source");
class UserRepository {
    constructor() {
        this.getUser = async (id_user) => {
            return await this.manager.findOne({
                where: { id_user: id_user }
            });
        };
        this.getAllUser = async () => {
            return await this.manager.find();
        };
        this.createUser = async (user) => {
            return await this.manager.save(user);
        };
        this.updateUser = async (id_user, name, email, number, password) => {
            await this.manager.update({ id_user }, { name, email, password, number });
            return this.manager.findOneBy({ id_user });
        };
        this.deleteUser = async (id_user) => {
            const result = await this.manager.delete({ id_user });
            return result.affected !== 0;
        };
        this.getAutenticationByEmailPassword = async (email) => {
            return await this.manager.findOne({
                where: { email }
            });
        };
        this.findByEmail = async (email) => {
            return this.manager.findOne({ where: { email } });
        };
        this.manager = app_data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.UserRepository = UserRepository;

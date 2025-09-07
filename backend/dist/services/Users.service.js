"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const Users_repositories_1 = require("../repositories/Users.repositories");
class UserService {
    constructor(userRepository = new Users_repositories_1.UserRepository()) {
        this.getUser = async (id_user) => {
            return await this.userRepository.getUser(id_user);
        };
        this.getAllUser = async () => {
            return await this.userRepository.getAllUser();
        };
        this.createUser = async (name, email, password) => {
            const user = new User_1.User(name, email, password);
            return await this.userRepository.createUser(user);
        };
        this.updateUser = async (id, name, email, password) => {
            return await this.userRepository.updateUser(id, name, email, password);
        };
        this.deleteUser = async (id_user) => {
            return await this.userRepository.deleteUser(id_user);
        };
        this.getAutenticationByEmailPassword = async (email, password) => {
            return await this.userRepository.getAutenticationByEmailPassword(email, password);
        };
        this.getToken = async (email, password) => {
            const user = await this.getAutenticationByEmailPassword(email, password);
            if (!user) {
                throw new Error("Usuario ou senha invalidos");
            }
            const token = jsonwebtoken_1.default.sign({ id_user: user.id_user, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return token;
        };
        this.userRepository = userRepository;
    }
}
exports.UserService = UserService;

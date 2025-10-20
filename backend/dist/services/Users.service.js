"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const Users_repositories_1 = require("../repositories/Users.repositories");
const emailAlreadyExistsError_1 = require("../errors/emailAlreadyExistsError");
const bcrypt = require('bcrypt');
class UserService {
    constructor(userRepository = new Users_repositories_1.UserRepository()) {
        this.getUser = async (id_user) => {
            return await this.userRepository.getUser(id_user);
        };
        this.getAllUser = async () => {
            return await this.userRepository.getAllUser();
        };
        this.createUser = async (name, email, password, number) => {
            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new emailAlreadyExistsError_1.EmailAlreadyExistsError();
            }
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const user = new User_1.User(name, email, passwordHash, number);
            return await this.userRepository.createUser(user);
        };
        this.updateUser = async (id, name, email, password, number) => {
            let passwordHash;
            if (password) {
                const salt = await bcrypt.genSalt(12);
                passwordHash = await bcrypt.hash(password, salt);
            }
            return await this.userRepository.updateUser(id, name, email, number, passwordHash);
        };
        this.deleteUser = async (id_user) => {
            return await this.userRepository.deleteUser(id_user);
        };
        this.getAutenticationByEmailPassword = async (email, password) => {
            const user = await this.userRepository.getAutenticationByEmailPassword(email);
            if (!user)
                return null;
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword)
                return null;
            return user;
        };
        this.getToken = async (email, password) => {
            const user = await this.getAutenticationByEmailPassword(email, password);
            if (!user) {
                throw new Error("Usuario ou senha invalidos");
            }
            const token = jsonwebtoken_1.default.sign({ id_user: user.id_user, email: user.email, role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return token;
        };
        this.userRepository = userRepository;
    }
}
exports.UserService = UserService;

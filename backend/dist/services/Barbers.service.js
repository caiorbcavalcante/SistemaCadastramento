"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarbersService = void 0;
const Barber_1 = require("../entities/Barber");
const Barbers_repositories_1 = require("../repositories/Barbers.repositories");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require('bcrypt');
const emailAlreadyExistsError_1 = require("../errors/emailAlreadyExistsError");
class BarbersService {
    constructor(barberRepository = new Barbers_repositories_1.BarberRepository()) {
        this.getBarber = async (id_barber) => {
            return await this.barberRepository.getBarber(id_barber);
        };
        this.getAllBarbers = async () => {
            return await this.barberRepository.getAllBarbers();
        };
        this.createBarber = async (name, email, password, number) => {
            const existingBarber = await this.barberRepository.findByEmail(email);
            if (existingBarber) {
                throw new emailAlreadyExistsError_1.EmailAlreadyExistsError();
            }
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const barber = new Barber_1.Barber(name, email, passwordHash, number);
            return await this.barberRepository.createBarber(barber);
            // const barber = new Barber(name, email, password,number)
            // return await this.barberRepository.createBarber(barber as Barber) // SE DER RUIM SO RETORNAR AQ
        };
        this.updateBarber = async (id, name, email, password, number, adminplus) => {
            let passwordHash;
            if (password) {
                const salt = await bcrypt.genSalt(12);
                passwordHash = await bcrypt.hash(password, salt);
            }
            return await this.barberRepository.updateBarber(id, name, email, number, adminplus, passwordHash);
        };
        this.deleteBarber = async (id_barber) => {
            return await this.barberRepository.deleteBarber(id_barber);
        };
        this.getAutenticationByEmailPassword = async (email, password) => {
            const barber = await this.barberRepository.getAutenticationByEmailPassword(email);
            if (!barber)
                return null;
            const checkPassword = await bcrypt.compare(password, barber.password);
            if (!checkPassword)
                return null;
            return barber;
        };
        this.getToken = async (email, password) => {
            const barber = await this.getAutenticationByEmailPassword(email, password);
            if (!barber) {
                throw new Error("Usuário ou senha inválida");
            }
            const token = jsonwebtoken_1.default.sign({ id_barber: barber.id_barber, email: barber.email, role: "barber" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return token;
        };
        this.barberRepository = barberRepository;
    }
}
exports.BarbersService = BarbersService;

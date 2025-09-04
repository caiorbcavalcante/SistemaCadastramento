"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarbersService = void 0;
const Barber_1 = require("../entities/Barber");
const Barbers_repositories_1 = require("../repositories/Barbers.repositories");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BarbersService {
    constructor(barberRepository = new Barbers_repositories_1.BarberRepository()) {
        this.getBarber = async (id_barber) => {
            return await this.barberRepository.getBarber(id_barber);
        };
        this.getAllBarbers = async () => {
            return await this.barberRepository.getAllBarbers();
        };
        this.createBarber = async (name, email, password) => {
            const barber = new Barber_1.Barber(name, email, password);
            return await this.barberRepository.createBarber(barber);
        };
        this.updateBarber = async (id, name, email, password) => {
            return await this.barberRepository.updateBarber(id, name, email, password);
        };
        this.deleteBarber = async (id_barber) => {
            return await this.barberRepository.deleteBarber(id_barber);
        };
        this.getAutenticationByEmailPassword = async (email, password) => {
            return await this.barberRepository.getAutenticationByEmailPassword(email, password);
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

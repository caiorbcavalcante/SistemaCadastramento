"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarbersController = void 0;
const Barbers_service_1 = require("../services/Barbers.service");
class BarbersController {
    constructor(barbersService = new Barbers_service_1.BarbersService()) {
        this.getBarber = async (request, response) => {
            try {
                const { id_barber } = request.params;
                if (!id_barber) {
                    return response.status(401).json({ message: "'Barbeiro não autenticado'" });
                }
                const barber = await this.barbersService.getBarber(parseInt(id_barber));
                if (!barber) {
                    return response.status(404).json({ message: "Barbeiro não encontrado" });
                }
                return response.status(200).json({ barber: barber?.id_barber,
                    name: barber?.name,
                    email: barber?.email });
            }
            catch {
                return response.status(500).json({ message: "Erro ao buscar barbeiro" });
            }
        };
        this.getAllBarbers = async (request, response) => {
            try {
                const barbers = await this.barbersService.getAllBarbers();
                return response.status(200).json({ barbers });
            }
            catch {
                return response.status(500).json({ message: "erro ao listar barbeiros" });
            }
        };
        this.createBarber = async (request, response) => {
            try {
                const barber = request.body;
                if (!barber.name || !barber.email || !barber.password) {
                    return response.status(400).json({ message: "Necessário nome, senha e email de usuário barbeiro" });
                }
                await this.barbersService.createBarber(barber.name, barber.email, barber.password);
                return response.status(201).json({ message: "Usuário de barbeiro cadastrado com sucesso! " });
            }
            catch {
                return response.status(500).json({ message: "Erro ao criar usuário de barbeiro" });
            }
        };
        this.updateBarber = async (request, response) => {
            try {
                const id = Number(request.params.id_barber);
                const barber = request.body;
                if (!barber.name || !barber.email || !barber.password) {
                    return response.status(400).json({ message: "Necessário nome, senha e email de usuário barbeiro" });
                }
                const updateBarber = await this.barbersService.updateBarber(id, barber.name, barber.email, barber.password);
                if (!updateBarber) {
                    return response.status(404).json({ message: "Conta de barbeiro não encontrada" });
                }
                return response.status(200).json({ message: "Conta de barbeiro atualizada com sucesso!",
                    name: updateBarber?.name,
                    email: updateBarber?.email
                });
            }
            catch {
                return response.status(500).json({ message: "Erro ao atualizar usuário de barbeiro" });
            }
        };
        this.deleteBarber = async (request, response) => {
            try {
                const { id_barber } = request.params;
                if (!id_barber) {
                    return response.status(400).json({ message: "ID do usuário de barbeiro não informado" });
                }
                const deleted = await this.barbersService.deleteBarber(Number(id_barber));
                if (!deleted) {
                    return response.status(404).json({ message: "Usuário de barbeiro não encontrado" });
                }
                return response.status(200).json({ message: "Usuário de barbeiro deletado com sucesso!" });
            }
            catch {
                return response.status(500).json({ message: "Erro ao deletar usuário de barbeiro" });
            }
        };
        this.getToken = async (request, response) => {
            try {
                const { email, password } = request.body;
                if (!email || !password) {
                    return response.status(400).json({ message: "Insira email e senha de usuário de barbeiro" });
                }
                const token = await this.barbersService.getToken(email, password);
                return response.status(200).json({ message: "Login efetuado com sucesso!", token });
            }
            catch {
                return response.status(500).json({ message: "Erro em tentativa de login" });
            }
        };
        this.barbersService = barbersService;
    }
}
exports.BarbersController = BarbersController;

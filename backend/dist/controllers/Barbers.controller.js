"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarbersController = void 0;
const Barbers_service_1 = require("../services/Barbers.service");
const emailAlreadyExistsError_1 = require("../errors/emailAlreadyExistsError");
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
                    email: barber?.email,
                    number: barber?.number,
                    adminplus: barber?.adminplus
                });
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
                if (!barber.name || !barber.email || !barber.password || !barber.number) {
                    return response.status(400).json({ message: "Necessário nome, senha, email e número" });
                }
                const newBarber = await this.barbersService.createBarber(barber.name, barber.email, barber.password, barber.number);
                const { password, ...barberWithoutPassword } = newBarber;
                return response.status(201).json({ message: "Usuário de barbeiro cadastrado com sucesso! ", barberWithoutPassword });
            }
            catch (error) {
                if (error instanceof emailAlreadyExistsError_1.EmailAlreadyExistsError) {
                    return response.status(409).json({ message: "Este email já foi cadastrado em outra conta." });
                }
                return response.status(500).json({ message: "Erro ao criar usuário de barbeiro" });
            }
        };
        this.updateBarber = async (request, response) => {
            try {
                const id = Number(request.params.id_barber);
                const barber = request.body;
                if (!barber || Object.keys(barber).length === 0) {
                    return response.status(400).json({ message: "Nenhuma mudança feita" });
                }
                const updateBarber = await this.barbersService.updateBarber(id, barber.name, barber.email, barber.password, barber.number, barber.adminplus);
                if (!updateBarber) {
                    return response.status(404).json({ message: "Conta de barbeiro não encontrada" });
                }
                return response.status(200).json({ message: "Conta de barbeiro atualizada com sucesso!",
                    name: updateBarber?.name,
                    email: updateBarber?.email,
                    number: updateBarber?.number,
                    adminplus: updateBarber?.adminplus
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Users_service_1 = require("../services/Users.service");
//botar admin em getalluser
class UserController {
    constructor(userService = new Users_service_1.UserService()) {
        this.getUser = async (request, response) => {
            try {
                const { id_user } = request.params;
                if (!id_user) {
                    return response.status(401).json({ message: "'Usuário não autenticado'" });
                }
                const user = await this.userService.getUser(parseInt(id_user));
                if (!user) {
                    return response.status(404).json({ message: "Usuário não encontrado" });
                }
                return response.status(200).json({ user: user?.id_user,
                    name: user?.name,
                    email: user?.email });
            }
            catch {
                return response.status(500).json({ message: "Erro ao buscar usuário" });
            }
        };
        this.getAllUser = async (request, response) => {
            try {
                const users = await this.userService.getAllUser();
                if (!users || users.length === 0) {
                    return response.status(404).json({ message: "Nenhum usuário encontrado" });
                }
                const usersMap = users.map(user => ({
                    id_user: user.id_user,
                    name: user.name,
                    email: user.email
                }));
                return response.status(200).json({ users: usersMap });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: "Erro ao listar usuários" });
            }
        };
        this.createUser = async (request, response) => {
            try {
                const user = request.body;
                if (!user.name || !user.email || !user.password) {
                    return response.status(400).json({ message: "Nome,email e senha são obrigatorios" });
                }
                await this.userService.createUser(user.name, user.email, user.password);
                return response.status(201).json({ message: "Usuario criado com sucesso" });
            }
            catch {
                return response.status(500).json({ message: "Nãoo foi possiviel criar um usuario" });
            }
        };
        this.updateUser = async (request, response) => {
            try {
                const id = Number(request.params.id_user);
                const user = request.body;
                if (!user.name || !user.email || !user.password) {
                    return response.status(400).json({ message: "Nome, email e senha são obrigatórios" });
                }
                const updateUser = await this.userService.updateUser(id, user.name, user.email, user.password);
                if (!updateUser) {
                    return response.status(404).json({ message: "Usuario inexistente" });
                }
                return response.status(200).json({ message: "Usuario atualizado com sucesso",
                    name: updateUser?.name,
                    email: updateUser?.email });
            }
            catch {
                return response.status(500).json({ message: "Não foi possiviel atualizar um usuario" });
            }
        };
        this.deleteUser = async (request, response) => {
            try {
                const { id_user } = request.params;
                if (!id_user) {
                    return response.status(400).json({ message: "ID do usuário não informado" });
                }
                const deleted = await this.userService.deleteUser(Number(id_user));
                if (!deleted) {
                    return response.status(404).json({ message: "Usuário não encontrado" });
                }
                return response.status(200).json({ message: "Usuário deletado com sucesso" });
            }
            catch {
                return response.status(500).json({ message: "Erro ao deletar usuário" });
            }
        };
        this.getToken = async (request, response) => {
            try {
                const { email, password } = request.body;
                if (!email || !password) {
                    return response.status(400).json({ message: "Os campos email e senha são obrigatorios" });
                }
                const token = await this.userService.getToken(email, password);
                return response.status(200).json({ message: "Login efetuado com sucesso", token });
            }
            catch {
                return response.status(500).json({ message: "Erro ao logar" });
            }
        };
        this.userService = userService;
    }
}
exports.UserController = UserController;

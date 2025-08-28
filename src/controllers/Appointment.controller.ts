import { Request, Response } from 'express'
import { AppointmentService } from '../services/Appointment.service'

export class AppointmentController {
    appointmentService: AppointmentService

    constructor(appointmentService = new AppointmentService()) {
        this.appointmentService = appointmentService
    }

    // Listar todos os agendamentos
    getAllAppointments = async (request: Request, response: Response) => {
        try {
            const appointments = await this.appointmentService.getAll()
            return response.status(200).json({ appointments })
        } catch {
            return response.status(500).json({ message: "Erro ao listar agendamentos" })
        }
    }

    // Buscar agendamento por id
    getAppointment = async (request: Request, response: Response) => {
        try {
            const { id } = request.params
            if (!id) {
                return response.status(400).json({ message: "ID do agendamento é obrigatório" })
            }

            const appointment = await this.appointmentService.getById(id)
            if (!appointment) {
                return response.status(404).json({ message: "Agendamento não encontrado" })
            }

            return response.status(200).json({ appointment })
        } catch {
            return response.status(500).json({ message: "Erro ao buscar agendamento" })
        }
    }

    // Criar agendamento
    createAppointment = async (request: Request, response: Response) => {
        try {
            const { cliente, barbeiro, data, serviço } = request.body
            if (!cliente || !barbeiro || !data || !serviço) {
                return response.status(400).json({ message: "Todos os campos são obrigatórios" })
            }

            const id = await this.appointmentService.create({ cliente, barbeiro, data, serviço })
            return response.status(201).json({ id })
        } catch {
            return response.status(500).json({ message: "Erro ao criar agendamento" })
        }
    }

    // Atualizar agendamento
    updateAppointment = async (request: Request, response: Response) => {
        try {
            const { id } = request.params
            const { cliente, barbeiro, data, serviço } = request.body

            const success = await this.appointmentService.update(id, { cliente, barbeiro, data, serviço })
            if (!success) {
                return response.status(404).json({ message: "Agendamento não encontrado" })
            }

            return response.status(200).json({ message: "Agendamento atualizado com sucesso" })
        } catch {
            return response.status(500).json({ message: "Erro ao atualizar agendamento" })
        }
    }

    // Deletar agendamento
    deleteAppointment = async (request: Request, response: Response) => {
        try {
            const { id } = request.params

            const success = await this.appointmentService.delete(id)
            if (!success) {
                return response.status(404).json({ message: "Agendamento não encontrado" })
            }

            return response.status(200).json({ message: "Agendamento deletado com sucesso" })
        } catch {
            return response.status(500).json({ message: "Erro ao deletar agendamento" })
        }
    }

    getAppointmentsByUser = async(request: Request, response: Response) => {
        try {
            const {userId} =request.params

            if(!userId){
                return response.status(400).json({message: "ID do usuário não informado"})
            }

            const appointments = await this.userService.getAppointmentsByUser(Number(userId))

            
            if (!appointments || appointments.length === 0) {
                return response.status(404).json({ message: "Nenhum agendamento encontrado para este usuário" });
        }
            return response.status(200).json({appointments})
        }catch{
             return response.status(500).json({message: "Error ao buscar agendamento do usuario"})
        }
    }
}

import { Request, Response } from 'express'
import { AppointmentService } from '../services/Appointment.service.ts'

export class AppointmentController {
    appointmentService: AppointmentService

    constructor(appointmentService = new AppointmentService()) {
        this.appointmentService = appointmentService
    }

    // Listar todos os agendamentos
    getAllAppointments = async (req: Request, res: Response) => {
        try {
            const appointments = await this.appointmentService.getAll()
            return res.status(200).json({ appointments })
        } catch {
            return res.status(500).json({ message: "Erro ao listar agendamentos" })
        }
    }

    // Buscar agendamento por id
    getAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: "ID do agendamento é obrigatório" })
            }

            const appointment = await this.appointmentService.getById(id)
            if (!appointment) {
                return res.status(404).json({ message: "Agendamento não encontrado" })
            }

            return res.status(200).json({ appointment })
        } catch {
            return res.status(500).json({ message: "Erro ao buscar agendamento" })
        }
    }

    // Criar agendamento
    createAppointment = async (req: Request, res: Response) => {
        try {
            const { cliente, barbeiro, data, serviço } = req.body
            if (!cliente || !barbeiro || !data || !serviço) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" })
            }

            const id = await this.appointmentService.create({ cliente, barbeiro, data, serviço })
            return res.status(201).json({ id })
        } catch {
            return res.status(500).json({ message: "Erro ao criar agendamento" })
        }
    }

    // Atualizar agendamento
    updateAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { cliente, barbeiro, data, serviço } = req.body

            const success = await this.appointmentService.update(id, { cliente, barbeiro, data, serviço })
            if (!success) {
                return res.status(404).json({ message: "Agendamento não encontrado" })
            }

            return res.status(200).json({ message: "Agendamento atualizado com sucesso" })
        } catch {
            return res.status(500).json({ message: "Erro ao atualizar agendamento" })
        }
    }

    // Deletar agendamento
    deleteAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const success = await this.appointmentService.delete(id)
            if (!success) {
                return res.status(404).json({ message: "Agendamento não encontrado" })
            }

            return res.status(200).json({ message: "Agendamento deletado com sucesso" })
        } catch {
            return res.status(500).json({ message: "Erro ao deletar agendamento" })
        }
    }
}

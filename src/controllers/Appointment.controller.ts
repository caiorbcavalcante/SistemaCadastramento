import { Request, Response } from 'express'
import { AppointmentService } from '../services/Appointment.service'

export class AppointmentController {
    appointmentService: AppointmentService

    constructor(appointmentService = new AppointmentService()) {
        this.appointmentService = appointmentService
    }

  
    getAllAppointments = async (request: Request, response: Response) => {
    try {
        const appointments = await this.appointmentService.getAllAppointments();

        if (!appointments || appointments.length === 0) {
            return response.status(404).json({ message: "Nenhum agendamento encontrado" });
        }

        return response.status(200).json({ appointments });
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        return response.status(500).json({ message: "Erro ao listar agendamentos" });
    }
    }


  
    getAppointment = async (request: Request, response: Response) => {
        try {
            const { id } = request.params
            if (!id) {
                return response.status(400).json({ message: "ID do agendamento é obrigatório" })
            }

            const appointment = await this.appointmentService.getAppointment(id)
            if (!appointment) {
                return response.status(404).json({ message: "Agendamento não encontrado" })
            }

            return response.status(200).json({ appointment })
        } catch (err){
            console.error("Falha ao buscar agendamento:", err)
            return response.status(500).json({ message: "Erro ao buscar agendamento" })
        }
    }

  
    createAppointment = async (request: Request, response: Response) => {
    try {
        const { clienteId, barbeiroId, data, servicoId } = request.body;

        if (!clienteId || !barbeiroId || !data || !servicoId) {
            return response.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const id = await this.appointmentService.createAppointment({
            userId: clienteId,
            barberId: barbeiroId,
            serviceId: servicoId,
            date: new Date(data)
        });

        return response.status(201).json({ id });
    } catch (err) {
        console.error("Erro ao criar agendamento:", err);
        return response.status(500).json({ message: "Erro ao criar agendamento" });
    }
    }


    
    updateAppointment = async (request: Request, response: Response) => {
        try {
            const { id } = request.params
            const { cliente, barbeiro, data, servico } = request.body

            const success = await this.appointmentService.updateAppointment(id, { cliente, barbeiro, data, servico })
            if (!success) {
                return response.status(404).json({ message: "Agendamento não encontrado" })
            }

            return response.status(200).json({ message: "Agendamento atualizado com sucesso" })
        } catch(err) {
            console.error("Erro ao atualizar agendamento:", err)
            return response.status(500).json({ message: "Erro ao atualizar agendamento" })
        }
    }

    
    deleteAppointment = async (request: Request, response: Response) => {
        try {
            const { id } = request.params

            const success = await this.appointmentService.deleteAppointment(id)
            if (!success) {
                return response.status(404).json({ message: "Agendamento não encontrado" })
            }

            return response.status(200).json({ message: "Agendamento deletado com sucesso" })
        } catch (err) {
            console.error("Erro ao deletar agendamento:", err)
            return response.status(500).json({ message: "Erro ao deletar agendamento" })
        }
    }

    getAppointmentsByUser = async(request: Request, response: Response) => {
        try {
            const {userId} =request.params

            if(!userId){
                return response.status(400).json({message: "ID do usuário não informado"})
            }

            const appointments = await this.appointmentService.getAppointmentsByUser(Number(userId))

            
            if (!appointments || appointments.length === 0) {
                return response.status(404).json({ message: "Nenhum agendamento encontrado para este usuário" });
        }
        const appoitmentsMap = appointments.map(a=>({
            id_appoitment: a.id_appointment,
            barberId:a.barber.id_barber,
            barberName: a.barber.name,
            date: a.date,
            id_service: a.service.id_service,
            description: a.service.description,
            price: a.service.price

        }))
            return response.status(200).json({appoitmentsMap})
        }catch{
             return response.status(500).json({message: "Error ao buscar agendamento do usuario"})
        }
    }
    getAppointmentsByBarber= async(request:Request, response:Response) =>{
        try{
            const {id_barber} = request.params
             if(!id_barber){
                return response.status(400).json({message: "ID do barbeiro não informado"})
            }
            const appointments = await this.appointmentService.getAppointmentsByBarber(id_barber)

            if(!appointments || appointments.length === 0){
                return response.status(404).json({message:"Nenhum agendamento encontrado para este barbeiro"})
            }
            const appointmentsMap = appointments.map(a => ({
                id_appointment: a.id_appointment,
                userId: a.user.id_user,
                userName: a.user.name,
                date: a.date,
                serviceId:a.service,
                description: a.service.description,
                price: a.service.price
                
            }))
            return response.status(200).json({appointmentsMap})
        }catch{
            return response.status(500).json({message: "Error ao buscar agendamento do barbeiro"})
        }
    }
}

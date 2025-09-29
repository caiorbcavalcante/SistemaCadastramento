import { Request, Response } from 'express'
import { AppointmentService } from '../services/Appointment.service'
import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";



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

          const formattedAppointments = appointments.map(app => ({
            user: app.user.name,          // nome do usuário
            barber: app.barber.name,      // nome do barbeiro
            service: app.service.description, // descrição do serviço
            price: app.service.price,         // preço do serviço
            date: new Date(app.date).toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                dateStyle: "short",
                timeStyle: "short"
            })
        }));
        return response.status(200).json({ appointments: formattedAppointments });
        
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        return response.status(500).json({ message: "Erro ao listar agendamentos" });
    }
}

  
    getAppointment = async (request: Request, response: Response) => {
        try {
            const { id_appointment } = request.params
           
            const idNumber = Number(id_appointment)
            const appointment = await this.appointmentService.getAppointment(idNumber)
            if (!appointment) {
                return response.status(404).json({ message: "Agendamento não encontrado" })
            }
            const formattedDate = new Date(appointment.date).toLocaleString("pt-BR", {
             timeZone: "America/Sao_Paulo",
             dateStyle: "short",
             timeStyle: "short"
        });

        return response.status(200).json({
        ...appointment,
        date: formattedDate
        });
        } catch (err){
            console.error("Falha ao buscar agendamento:", err)
            return response.status(500).json({ message: "Erro ao buscar agendamento" })
        }
    }

  
    createAppointment = async (request: Request, response: Response) => {
    try {
        const { user, barber, date, service } = request.body;

        if (!user || !barber || !date || !service) {
            return response.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const parsedDate = parse(date, "dd/MM/yyyy HH:mm", new Date());

        const appointment = await this.appointmentService.createAppointment({
            user,
            barber,
            service,
            date: parsedDate
        });

        const formattedDate = new Date(appointment.date).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            dateStyle: "short",
            timeStyle: "short"
        });

        // monta o retorno sem o id_appointment
        const responseData = {
            user: appointment.user,
            barber: appointment.barber,
            service: appointment.service,
            date: formattedDate
        };
      
        
        return response.status(201).json({ responseData });
    } catch (err) {
        console.error("Erro ao criar agendamento:", err);
        return response.status(500).json({ message: "Erro ao criar agendamento" });
    }
    }


    
    updateAppointment = async (request: Request, response: Response) => {
        try {
            const { id_appointment } = request.params
            const { user, barber, date, service } = request.body

            const idNumber = Number(id_appointment)

            const success = await this.appointmentService.updateAppointment(idNumber, { user, barber, date, service })
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
            const { id_appointment } = request.params

            const success = await this.appointmentService.deleteAppointment(id_appointment)
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
            barberNumber: a.barber.number,
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
            const appointments = await this.appointmentService.getAppointmentsByBarber(Number(id_barber))

            if(!appointments || appointments.length === 0){
                return response.status(404).json({message:"Nenhum agendamento encontrado para este barbeiro"})
            }
            const appointmentsMap = appointments.map(a => ({
                id_appointment: a.id_appointment,
                userId: a.user.id_user,
                userName: a.user.name,
                userNumber:a.user.number,
                date: a.date,
                serviceId:a.service,
                description: a.service.description,
                price: a.service.price
                
            }))
            return response.status(200).json(appointmentsMap)
        }catch{
            return response.status(500).json({message: "Error ao buscar agendamento do barbeiro"})
        }
    }
}

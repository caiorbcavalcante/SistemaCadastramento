import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import "./UserAppointments.css"
interface IAppointment {
  id_appointment: number,
  barberId: number,
  barberName: string,
  barberNumber: string,
  date: Date | string,
  id_service: number,
  description: string,
  price: number
}

export const UserAppointments:React.FC = () => {
    const [appointments,setAppointments] = useState<IAppointment[]>([])
    const [error, setError] = useState<string | null>(null)

    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchAppointments = async () => {
        if (!token) return

       try{
            const decodedToken :any = jwtDecode(token)
             const userId = decodedToken.id_user
             
        const res = await axios.get(`http://localhost:3000/appointments/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

        setAppointments(res.data)

       } catch (err: any) {
          if (err.response?.status === 404) {
        console.log("🔹 Usuário não tem agendamentos (isso é normal)");
        setAppointments([]) // 🔹 Array vazio é normal
        setError(null) // 🔹 NÃO MOSTRA ERRO ←←← ESSA É A MUDANÇA PRINCIPAL
    } else if (err.response?.status === 401) {
        setError("Token inválido ou expirado");
        setAppointments([])
    } else if (err.response?.status === 500) {
        setError("Erro interno do servidor");
        setAppointments([])
    } else {
        setError("Erro ao carregar agendamentos.");
        setAppointments([])
    }
       }

    }
    fetchAppointments()
    },[token])

    return(
        <div className="user-appointments-section">
  <h2>Meus Agendamentos</h2>

  {error && <p className="user-appointments-error">{error}</p>}

  {appointments.length === 0 ? (
    <p className="user-appointments-empty">Você não tem agendamentos ainda.</p>
  ) : (
    <ul className="user-appointments-list">
      {appointments.map((appt:IAppointment)=> (
        <li key={appt.id_appointment}>
          {new Date(appt.date).toLocaleString("pt-BR")} - {appt.description} com {appt.barberName}
        </li>
      ))}
    </ul>
  )}
</div>

    )
}
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"

interface IAppointment {
  id_appointment: number;
  date: Date;
  description: string;
  barberName: string;
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

        // 🔹 CORREÇÃO: Verifica diferentes formatos possíveis
                if (Array.isArray(res.data)) {
                    setAppointments(res.data)
                } else if (res.data && Array.isArray(res.data.appointments)) {
                    setAppointments(res.data.appointments)
                } else if (res.data && Array.isArray(res.data.data)) {
                    setAppointments(res.data.data)
                } else {
                    setError("Formato de agendamentos inválido")
                    setAppointments([])
                }
        setError(null)

       } catch {
        setError("Erro ao carregar agendamentos.")
          setAppointments([])
       }

    }
    fetchAppointments()
    },[token])

    return(
        <div>
            <h2>Meus Agendamentos</h2>

            {error && <p style={{ color: "red" }}> {error}</p>}

            {appointments.length === 0 ? (
                <p>Você não tem agendamentos ainda.</p>

            ): (
                <ul>
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
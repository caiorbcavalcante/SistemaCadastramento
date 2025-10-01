import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthContext";

interface IAppointment {
  id_appointment: number;
  date: Date;
  description: string;
  barberName: string;
}

export const UserAppointments:React.FC = () => {
    const [appointments,setAppointments] = useState([])
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth();

    const token = localStorage.getItem("token")
    const userId =  user ? user.id : null

    useEffect(() => {
        const fetchAppointments = async () => {
        if (!token || !userId) return

       try{
        const res = await axios.get(`http://localhost:3000/appointments/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

        setAppointments(res.data)
        setError(null)

       } catch {
        setError("Erro ao carregar agendamentos.")
       }

    }
    fetchAppointments()
    },[token,userId])

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
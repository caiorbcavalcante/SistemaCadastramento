import React, { useEffect, useState } from "react";
import axios from "axios";


interface IBarber {
  id_barber: string;
  name: string;
}

interface IService {
  id_service: string;
  description: string;
  price: number;
}

export const NewAppointment: React.FC = () => {
  const [barber, setBarber] = useState("")
  const [service, setService] = useState("")
  const [date, setDate] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success,setSuccess] = useState<string | null>(null)
  const [barbers, setBarbers] = useState<IBarber[]>([]);
  const [services, setServices] = useState<IService[]>([]);

  const token = localStorage.getItem("token");
  const id_user = localStorage.getItem("id_user");

  useEffect(()=>{

    const fetchNewAppointments = async () => {
        try{
            if (!token) throw new Error("Token não encontrado.")

           const [barbersRes, servicesRes] = await Promise.all([
            axios.get("http://localhost:3000/barbers", {
            headers: { Authorization: `Bearer ${token}` }
        }),
          axios.get("http://localhost:3000/service", {
            headers: { Authorization: `Bearer ${token}` },
          }),

            ])

            setBarbers(barbersRes.data)
            setServices(servicesRes.data);
            setError(null);

    } catch {
        setError("Erro ao carregar barbeiros ou serviços.")
    }
  }

  fetchNewAppointments()
},[token])


    const handleCreate = async () => {
      setError(null)
      setSuccess(null)

      if(!barber || !service || !date) {
        setError("Preencha todos os campos.");
        return
      }

      try{
         if (!token || !id_user) throw new Error("Usuário não autenticado.")

           await axios.post("http://localhost:3000/appointments",
            {
              user:id_user,
              barber:barber,
              service:service,
              date

            }, {
               headers: { Authorization: `Bearer ${token}` },
            }
          )
          
        setSuccess("Agendamento realizado com sucesso!")
        setBarber("")
        setService("")
        setDate("")

      }catch{
        setError("Erro ao criar agendamento. Tente novamente.")
      }
    }

    const handleClear = () => {
        setBarber("")
        setService("")
        setDate("")
        setError(null)
        setSuccess(null)
    }
    return(
      <div>
        <h2>Agendar Serviço</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success &&  <p style={{ color: "green" }}>{success}</p>}

        <select onChange={(e) => setBarber(e.target.value)} value={barber}>
          <option value="">Selecione o Barbeiro</option>
          {barbers.map((b)=> (
            <option key={b.id_barber} value={b.id_barber}> 
            {b.name}
             </option>
          ))}
        </select>

        <select onChange={(e)=> setService(e.target.value)} value={service}>
          <option>Selecione o Serviço</option>
          {services.map((s)=>(
            <option key={s.id_service} value={s.id_service}>
              {s.description} - R$ {s.price.toFixed(2)}
            </option>
          ))}

        </select>

        <input placeholder=" Data do Agendamento"  type="datetime-local" value={date} onChange={(e)=> setDate(e.target.value)}/>


        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleCreate} style={{ marginRight: "1rem" }}>Agendar</button>

          <button onClick={handleClear}>Cancelar</button>
          </div>
      </div>

    )

}




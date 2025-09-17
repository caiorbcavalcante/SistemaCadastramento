import React, { useEffect, useState } from "react";
import axios from "axios";

export const NewAppointment: React.FC = () => {
  const [barber, setBarber] = useState("")
  const [service, setService] = useState("")
  const [date, setDate] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success,setSuccess] = useState("")

  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);

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


    const handleCreate

    return(

    )

}




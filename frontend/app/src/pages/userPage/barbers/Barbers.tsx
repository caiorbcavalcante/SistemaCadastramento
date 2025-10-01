import React, { useEffect, useState } from "react";
import axios from "axios";


interface IBarber {
  id_barber: string;
  name: string;
  number:number

}

export const Barbers: React.FC = () => {
  const [barbers, setBarbers] = useState<IBarber[]>([])
  const [error, setError] = useState<string | null>(null)

    const token = localStorage.getItem("token")

  useEffect(() => {
    if(!token) return
    const fetchBarbers = async () => {
        try{
            const res = await axios.get(("http://localhost:3000/barbers"), {
                headers: { Authorization: `Bearer ${token}`,
          },})
            if (res.data && Array.isArray(res.data.barbers)) {
          setBarbers(res.data.barbers)
          setError(null)
        } else {
          setError("Formato de dados inválido")
          setBarbers([])
        }
        } catch{
            setError("Erro ao carregar os barbeiros. Tente novamente.")
        }
    }
    fetchBarbers()
    },[token])

  return (

    <div> 
        <h2>Barbeiros</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul>
            {barbers.map((b) => (
                <li key={b.id_barber}>
                  <strong>👤 {b.name}</strong> - 📞 {b.number}
    
                </li>
            ))}
        </ul>
    </div>

  )

}

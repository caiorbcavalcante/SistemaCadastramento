import React, { useEffect, useState } from "react";
import axios from "axios";


interface IBarber {
  id_barber: string;
  name: string;
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
          setBarbers(res.data)
          setError(null)
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
                    {b.name}
                    {/* colocar o numero*/}
    
                </li>
            ))}
        </ul>
    </div>

  )

}

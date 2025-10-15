import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Barbers.css";
import barberImg from "../../../assets/image.png";



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

       <section className="barbers-section">
      <h2 className="barbers-title">Barbeiros</h2>

      {error && <p className="barbers-error">{error}</p>}

      <ul className="barbers-list">
        {barbers.length > 0 ? (
          barbers.map((b) => (
            <li key={b.id_barber} className="barber-item">
            
 <div className="barber-avatar">
  <img src={barberImg} alt="Barbeiro" className="barber-img" />
</div>

              <div className="barber-info">
                <span className="barber-name">{b.name}</span>
                <span className="barber-phone">📞 {b.number}</span>
              </div>
            </li>
          ))
        ) : (
          !error && <p className="barbers-empty">Carregando barbeiros...</p>
        )}
      </ul>
    </section>
  );

}

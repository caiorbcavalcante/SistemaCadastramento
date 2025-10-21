import axios from "axios";
import { useEffect, useState } from "react";
import "./Service.css";
interface IService {
  id_service: number;
  description: string;
  price: number;
}


export const Services: React.FC = () => { 
    const [services,setServices] = useState<IService[]>([])
    const [error, setError] = useState<string | null>(null);

   const token = localStorage.getItem("token")

    useEffect(() => {
        if(!token) return
        const fetchServices = async () => { 

            try{
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/service`,{ 
                headers:{Authorization:`Bearer ${token}`},
                })
                 
                console.log("Resposta da API Services:", res.data); // 🔹 DEBUG
                
                // 🔹 CORREÇÃO: Verifica diferentes formatos possíveis
                if (Array.isArray(res.data)) {
                    setServices(res.data)
                } else if (res.data && Array.isArray(res.data.services)) {
                    setServices(res.data.services)
                } else if (res.data && Array.isArray(res.data.data)) {
                    setServices(res.data.data)
                } else {
                    setError("Formato de serviços inválido")
                    setServices([])
                }
                setError(null)
            } catch {
                setError("Erro ao carregar os serviços. Tente novamente.")
                setServices([])
            }
        }
        fetchServices()
    },[token])

    return (
        <section className="services-section">
      <h2 className="services-title">Serviços Disponíveis</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="services-list">
        {services.map((s) => (
          <li key={s.id_service} className="service-item">
            <span className="service-description">{s.description}</span>
            <span className="service-price">R$ {s.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </section>
    )
}
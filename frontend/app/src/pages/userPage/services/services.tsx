import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

interface IService {
  id_service: number;
  description: string;
  price: number;
}


export const Services: React.FC = () => { 
    const [services,setServices] = useState<IService[]>([])
    const [error, setError] = useState<string | null>(null);
    const { user} = useAuth()

    const token = localStorage.getItem("token")
     const userId =  user?  user.id : null


    useEffect(() => {
        if(!token || !userId) return
        const fetchServices = async () => { 

            try{
                const res = await axios.get(`http://localhost:3000/service`,{ 
                headers:{Authorization:`Bearer ${token}`},
                })
                setServices(res.data)
                setError(null)
            } catch {
                setError("Erro ao carregar os serviços. Tente novamente.")
            }
        }
        fetchServices()
    },[token,userId])

    return (
        <div>
        <h2>Serviços Disponíveis</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <ul>
            {services.map((s) => (
                <li key={s.id_service}>
                    {s.description} - R$ {s.price.toFixed(2)}
                </li>
            ))}
        </ul>
        </div>
    )
}
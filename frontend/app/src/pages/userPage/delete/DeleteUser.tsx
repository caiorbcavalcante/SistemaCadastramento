import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"


export const DeleteUser: React.FC = () => {
    const [error,setError] = useState<string | null>(null)
    const [success,setSuccess] = useState<string | null>(null)
    const { user } = useAuth()
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    const userId =  user ? user.id : null
   

    const handleDelete = async () => {
            if (!userId || !token) {
            setError("Usuário não autenticado.");
         return;
    }
         const confirm = window.confirm("Tem certeza que deseja deletar sua conta?");
        if (!confirm) return
        setError(null)
        setSuccess(null)

     
        try{
             await axios.delete("http://localhost:3000/user/${userId}", {
                   headers: { Authorization: `Bearer ${token}` },
        })
            setError(null)
            setSuccess("Usuario deletado com sucesso")

            localStorage.removeItem("token");
           
            setTimeout(()=>{
                navigate("/")
            },2000)
        }catch{
            setError("Erro ao deletar usuário")
            setSuccess(null)
        }
    }


    return(
        <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success &&  <p style={{ color: "green" }}>{success}</p>}

        <button onClick={handleDelete}>Deletar conta</button>
        </div>
    )
}
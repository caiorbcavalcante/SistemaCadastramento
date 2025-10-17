import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import { Input } from "../../components/input/Input"
import { useNavigate } from "react-router-dom"
import"./NewPassword.css"


export const  NewPassword:React.FC = () => {
    const {user} = useAuth()
    const [password,setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handlePassword = async (e: React.FormEvent) => {
         e.preventDefault()

        if (!user) { 
        alert("Usuário não autenticado");
        return;
         }
        try{
            const token = localStorage.getItem("token")
            const endpoint = user.role === "barber" ? "barbers" : "user"

            await axios.patch( `http://localhost:3000/${endpoint}/${user.id}`,
                {password},
                {
             headers: {
            Authorization: `Bearer ${token}`,
          },
        }
            )
            
      setMessage("Senha alterada com sucesso!");
      setTimeout(() => {
        navigate("/login")        
      },1500)
    } catch (err) {
        console.log(err)
      alert("Erro ao alterar senha. Verifique os dados.");
    }
    
    }
    
    return(
    <form onSubmit={handlePassword}>
        <h3>Alterar Senha</h3>

        <Input
        placeholder="Nova Senha"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>


        <button type="submit">Salvar</button>


        {message && <p>{message}</p>}


    </form>

    )
}

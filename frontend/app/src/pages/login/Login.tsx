import { useEffect, useState } from "react"
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Login:React.FC = () => {

    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [tipo, setTipo] = useState<"user" | "barber">("user")
    const navigate = useNavigate()

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if(token){
            navigate("/home")
        }
    },[navigate])

    const handleLogin =async () => {
        try{ 
            const endpoint =
            tipo === "user"
            ? "http://localhost:3000/user/login"
            : "http://localhost:3000/barbers/login"

            const response = await axios.post(endpoint, {email,password:senha})

            const token= response.data.token

            localStorage.setItem("token",token)
            localStorage.setItem("tipo",tipo)

            navigate("/home")

        }catch{
            alert("Login falhou: verifique suas credenciais")
        }
        
    }
    return(
        <div>
            <h2>Login</h2>

            <Input placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <Input 
            placeholder="senha"
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}/>

            
            <div>
                <Button text="entrar" onClick={handleLogin} />
            </div>
        </div>
    )
}
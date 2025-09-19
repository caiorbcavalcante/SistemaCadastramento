import { useEffect, useState } from "react"
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Login:React.FC = () => {

    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [error,setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(()=> {
        const token = localStorage.getItem("token")
        const role = localStorage.getItem("role")
        if(token && role){
            navigate(role === "barber" ? "/barber" : "/user")
        }
    },[navigate])

    const handleLogin = async () => {   

        if(!email || !senha) {
            setError("Preencha os campos")
            return
        }

        try{ 
          const res = await axios.post("http://localhost:3000/user/login", {
            email, 
            password:senha
          })

          localStorage.setItem("token",res.data.token)
          localStorage.setItem("id_user", res.data.id_user)
          localStorage.setItem("role","user")

          navigate("/user")

        }catch{
            try{
                const res = await axios.post("http://localhost:3000/barbers/login", {
                email, 
                password:senha
            })

                
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("id_barber", res.data.id_barber)
            localStorage.setItem("role","barber")

            navigate("/controlPanel")

            }catch{
                alert("Login falhou: verifique suas credenciais")
             }
           
        }
        
    }
    return(
        <div>
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
       

            <Input placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <Input 
            type="password"
            placeholder="senha"
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}/>

            
            <div>
                <Button text="Entrar" onClick={handleLogin} />
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import type { ReactFormEvent } from "react-dom/client"

export const Login:React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [error, setError] = useState<string | null> (null)
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e: ReactFormEvent) => {
        e.preventDefault();
        setError(null);
        
        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email,
                password: senha
            })
            const token = res.data.token;
            await login(token);
            navigate('/user') // bota aqui a rota de usuario eu n sei ql e
            return
        } catch {}

        try {
            const res = await axios.post("http://localhost:3000/barbers/login", {
                email,
                password: senha
            })
            const token = res.data.token;
            await login(token)
            navigate('/controlPanel')
            return
        } catch {
            setError("Email ou senha inválida.")
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
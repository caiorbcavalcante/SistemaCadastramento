import { useState } from "react"
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Login:React.FC = () => {

    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const navigate = useNavigate()

    const handleLogin =async () => {
        try{ 
            const response = await axios.post("http://localhost:3000/login", {email,senha})

        }
        
    }
    return(
        <div>
            <Input placeholder="email"
            value="" 
            onChange={()=>{}}
            />

            <Input 
            placeholder="senha"
            value="" 
            onChange={()=>{}}/>

            
            <div>
                <Button text="entrar" />
            </div>
        </div>
    )
}
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

    const validateLogin = (email:string, password:string): string | null => {
        
        if(!email || !password) {
            return ("Preencha os campos")         
        }

        if(!email.includes("@") || !email.includes(".")){return ("Email inválido.")}

        if(password.length < 6){return("A senha deve conter no mínimo 6 digitos")}
        return null
    }

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



    // const [email,setEmail] = useState("")
    // const [senha,setSenha] = useState("")
    // const [error,setError] = useState<string | null>(null)
    // const navigate = useNavigate()

    // useEffect(()=> {
    //     const token = localStorage.getItem("token")
    //     const role = localStorage.getItem("role")
    //     if(token && role){
    //         navigate(role === "barber" ? "/barber" : "/user")
    //     }
    // },[navigate])

    // const handleLogin = async () => {   
    //     setError(null)
    //     const validadeHandle = validateLogin(email,senha)
    //         if(validadeHandle){
    //             setError(validadeHandle)
    //         }


    //     try{ 
    //       const res = await axios.post("http://localhost:3000/user/login", {
    //         email, 
    //         password:senha
    //       })

    //       localStorage.setItem("token",res.data.token)
    //       localStorage.setItem("id_user", res.data.id_user)
    //       localStorage.setItem("role","user")

    //       navigate("/user")

    //     }catch{
    //         try{
    //             const res = await axios.post("http://localhost:3000/barbers/login", {
    //             email, 
    //             password:senha
    //         })

                
    //         localStorage.setItem("token",res.data.token)
    //         localStorage.setItem("id_barber", res.data.id_barber)
    //         localStorage.setItem("role","barber")

    //         navigate("/controlPanel")

    //         }catch{
    //             alert("Login falhou: verifique suas credenciais")
    //          }
           
    //     }
        // OBS => TUDO COMENTADO É O QUE O BILOLA JA TINHA FEITO. SE DER MERDA É SO APAGAR O QUE NAO TA COMENTADO NESSE MEIO E DESCOMENTAR TODO O RESTO
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
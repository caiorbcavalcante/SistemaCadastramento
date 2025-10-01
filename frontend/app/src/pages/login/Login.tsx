import { useState } from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validarEmail, validarSenha } from "../../utils/utils";
import axios from "axios";
import type { FormEvent } from "react";

export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateLogin = (email: string, password: string): string | null => {
        if (!email || !password) return "Preencha os campos";

        const emailError = validarEmail(email);
        if (emailError) return emailError;

        const senhaError = validarSenha(password);
        if (senhaError) return senhaError;

        return null;
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationError = validateLogin(email, senha);
        if (validationError) {
            setError(validationError);
            return;
        }

        // 1ª tentativa: login como user
        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email,
                password: senha,
            });
            const token = res.data.token;
            await login(token);
            navigate("/user");
            return;
        } catch (err: any) {
            console.warn("Tentativa como user falhou:", err.response?.data || err.message);
        }

        // 2ª tentativa: login como barber
        try {
            const res = await axios.post("http://localhost:3000/barbers/login", {
                email,
                password: senha,
            });
            const token = res.data.token;
            await login(token);
            navigate("/controlPanel");
            return;
        } catch (err: any) {
            console.warn("Tentativa como barber falhou:", err.response?.data || err.message);
            setError("Email ou senha inválida."); // só mostra erro aqui
        }
    };

    return (
        <div>
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                type="password"
                placeholder="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <div>
                <Button text="Entrar" onClick={handleLogin} />
            </div>
        </div>
    );
};
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
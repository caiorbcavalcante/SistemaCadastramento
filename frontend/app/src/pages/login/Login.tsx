import { useState } from "react";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { validarEmail, validarSenhaDetalhada } from "../../utils/utils";
import axios from "axios";
import type { FormEvent } from "react";



export const Login:React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null> (null)
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateLogin = (email: string, password: string): string | null => {
        if (!email || !password) return "Preencha os campos";

        const emailError = validarEmail(email);
        if (emailError) return emailError;

        if (password.length < 6) {
            return "A senha deve ter pelo menos 6 caracteres";
        }

        return null;
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationError = validateLogin(email, password);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email,
                password
            })
            const token = res.data.token;
            await login(token);
            navigate('/user') 
            return
        } catch {}

        try {
            const res = await axios.post("http://localhost:3000/barbers/login", {
                email,
                password
            })
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
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>

            <div>
                <Button text="Entrar" onClick={handleLogin} />
            </div>
        </div>
    );
};
     






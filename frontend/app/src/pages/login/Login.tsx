import { useState } from "react"
import { Button } from "../../components/button/Button"
import { Input } from "../../components/input/Input"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import React from "react";

import './Login.css';

export const Login:React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [error, setError] = useState<string | null> (null)
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async () => {
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
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Bem-vindo de volta</h2>
                <h2 className="login-subtitle">Faça login para continuar</h2>

                {error && <p className='login-error' style={{ color: "red" }}>{error}</p>}
        
                <form className="login-form" onSubmit={handleLogin}>
                    <Input placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />

                    <Input 
                    type="password"
                    placeholder="senha"
                    value={senha}
                    onChange={(e)=>setSenha(e.target.value)}/>

                    <Button text="Entrar" onClick={() => {handleLogin()}} />
                </form>
            <a href="/reset-password">Redefinir Senha</a>
            </div>
        </div>
    )
}
import './Form.css' // Pode criar um CSS genérico para os formulários
import { useState } from 'react'
import axios from "axios"

const createBarbers: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = user<string>("");

    const isValidEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    const createBarber = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (!isValidEmail(email)){
                alert("Email inválido!");
                return;
            }

            const response = await axios.post("http://localhost:3000/barbers",{ // Enviando o barbeiro criado para o back-end
                name,
                email,
                password
            });

            console.log("Barbeiro criado")
        } catch (err: any) {
            console.log("Erro ao criar barbeiro", err);
        }
    }

    return (
        <form onSubmit={createBarber}>
            <input 
                type="text" 
                placeholder="Nome" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Senha" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Criar Barbeiro</button>
        </form>
    );

}




import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "../../../components/input/Input";
import { Button } from "../../../components/button/Button";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css"


const validateForm = (name: string, password: string, email:string, number : string): string | null => {
    if (!name || !password || !email || !number) {
        return "Preencha todos os campos.";
    }

    if (!email.includes("@") || !email.includes(".")) { return "Email inválido."; }
    if (password.length < 6) { return "A senha deve ter pelo menos 6 caracteres."; }
    const digitsOnly = number.replace(/\D/g, "");
    if (digitsOnly.length !== 11) return "O número deve ter 11 dígitos";
    return null;
}

const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

interface User {
    id: number;
    name: string;
    password?: string;
    email:string;
    number:string;
}

export const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ name: "", password: "", email:"", number:"" });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    // 🔹 CORREÇÃO: Tenta ambas as chaves possíveis
    const getToken = () => {
        return localStorage.getItem("token") || localStorage.getItem("authToken");
    };

    const token = getToken();

    useEffect(() => {
        console.log("Token encontrado:", token); // 🔹 DEBUG
        
        if (!token) {
            setError("Usuário não autenticado. Faça login novamente.");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const decodedToken = jwtDecode<{ 
                    id_user?: number,         
                    id?: number,
                    userId?: number,  
                    email: string, 
                    role: string, 
                    exp: number 
                }>(token);              

                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("authToken");
                    setError("Sessão expirada. Faça login novamente.");
                    setLoading(false);
                    return;
                }

                const userId = decodedToken.id_user || decodedToken.id || decodedToken.userId;

                if (!userId) {
                    setError("ID do usuário não encontrado no token");
                    setLoading(false);
                    return;
                }

                const res = await axios.get(`http://localhost:3000/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Resposta da API:", res.data); // 🔹 DEBUG

                setUser({
                    id: userId,
                    name: res.data.name,
                    email: res.data.email,
                    number: res.data.number
                });
                setForm({ 
                    name: res.data.name, 
                    password: "", 
                    email: res.data.email, 
                    number: res.data.number 
                });
                setError(null);
                
            } catch (err: any) {
                console.error("Erro detalhado:", err);
                
                if (err.response?.status === 404) {
                    setError("Usuário não encontrado no servidor");
                } else if (err.response?.status === 401) {
                    setError("Token inválido ou expirado");
                    localStorage.removeItem("token");
                    localStorage.removeItem("authToken");
                } else if (err.response?.status === 403) {
                    setError("Acesso negado");
                } else if (err.code === "NETWORK_ERROR" || err.message === "Network Error") {
                    setError("Erro de conexão com o servidor");
                } else {
                    setError("Erro ao carregar perfil do usuário");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [token]);

    const handleSave = async () => {
        if (!user) return;
        setError(null);

        const validationError = validateForm(form.name, form.password, form.email, form.number);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                setError("Token não encontrado");
                return;
            }

            const decodedToken = jwtDecode<{ 
                    id_user?: number,         
                    id?: number,
                    userId?: number,  
                    email: string, 
                    role: string, 
                    exp: number 
                }>(token);         
              const userId = decodedToken.id_user 

            const res = await axios.patch(
                `http://localhost:3000/user/${userId}`,
                { name: form.name, email: form.email, password: form.password, number: form.number.replace(/\D/g, "") },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(res.data);
            setEdit(false);
            setForm({ ...form, password: "" });
            setError(null);
        } catch {
            setError("Erro ao atualizar perfil. Tente novamente.");
        }
    };


    if (loading) return <p>Carregando perfil...</p>;

    if (!user) return (
        <div>
            <p style={{ color: "red" }}>Usuário não encontrado.</p>
            {error && <p style={{ color: "red" }}>Detalhes: {error}</p>}
        </div>
    );

    return (
       <div className="user-profile-container">
  <h2>Perfil</h2>
  {error && <p className="error-msg">{error}</p>}

  {edit ? (
    <div className="edit-form">
      <Input 
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      /> 

      <Input 
        placeholder="Senha"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /> 

      <Input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        placeholder="Número (DDD + telefone)"
        type="text"
        value={form.number}
        onChange={(e) => setForm({ ...form, number: formatPhoneNumber(e.target.value) })}
      />

      <div className="button-group">
        <Button text="Salvar" onClick={handleSave} />
        <Button text="Cancelar" onClick={() => {
            setForm({ name: user.name, password: "", email: user.email, number: user.number });
            setEdit(false);
            setError(null);
        }} />
      </div>
    </div>
  ) : (
    <div className="user-info">
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Número: {user.number}</p>

      <div className="button-group">
        <Button text="Editar" onClick={() => setEdit(true)} />
        <Button text="Voltar" onClick={() => navigate("/user")} />
      </div>
    </div>
  )}
</div>

      
        
    );
}
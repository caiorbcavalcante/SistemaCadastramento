import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "../../../components/input/Input";
import { Button } from "../../../components/button/Button";


const validadeForm = (name: string, password: string, email:string, number : string): string | null => {
     if (!name || !password ||!email ||!number) {
     return "Preencha todos os campos."
    }

    if (!email.includes("@") || !email.includes(".")) {return "Email inválido."}
    if (password.length < 6) { return "A senha deve ter pelo menos 6 caracteres."}
    const digitsOnly = number.replace(/\D/g, ""); // remove tudo que não é número
  if (digitsOnly.length !== 11) return "O número deve ter 11 dígitos";
    return null;
}

const formatPhoneNumber = (value: string) => {
  // Remove tudo que não é número
  const digits = value.replace(/\D/g, "");

  // Formata conforme o tamanho
  if (digits.length <= 2) return digits; // só DDD
  if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2)}`; // DDD + parte inicial
  return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7, 11)}`}

interface User {
  id: number;
  name: string;
  password?: string;
  email:string
  number:string
}
export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", password: "",email:"",number:""});
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const id_user = localStorage.getItem("id_user");

  useEffect(() => {
    if (!token || !id_user) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${id_user}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setForm({ name: res.data.name, password: "", email:res.data.email, number: res.data.number })
        setError(null);
      } catch {
        setError("Erro ao buscar usuário");
      }
    };

    fetchUser();
  }, [id_user, token]);

  const handleSave = async () => {
    setError(null);

    const validationError = validadeForm(form.name, form.email, form.password, form.number)
    if(validationError){
      setError(validationError)
      return
    }

    try {
      const res = await axios.patch(
        `http://localhost:3000/user/${id_user}`,
        { name: form.name, password: form.password, number: Number(form.number) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEdit(false);
      setForm({ ...form, password: "" })
      setError(null);
    } catch {
      setError("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  if (!user) return <p>Carregando perfil...</p>;

  return (
    <div>
      <h2>Perfil</h2>
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

    {edit ? (
      <div>
        <Input 
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({... form, name:e.target.value})}/> 

        <Input 
        placeholder="senha"
        value={form.password}
        onChange={(e) => setForm({... form, password:e.target.value})}/> 

        <Input
        placeholder="email"
        value={form.email}
        onChange={(e) =>  setForm({... form, email:e.target.value})}/>

        <Input
          placeholder="Número (DDD + telefone)"
          type="number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: formatPhoneNumber(e.target.value) })}
          />

        <Button text="Salvar" onClick={handleSave} />

        <Button text="Cancelar" onClick={() => {
        setForm({ name: user.name, password: "", email: user.email, number: user.number });
        setEdit(false);
        setError(null);
        }} />
   
      </div>
    ):(
      <div> 
        <p>Nome:{user.name}</p>
        <p>Email:{user.email}</p>
        <p>Número: {user.number}</p>

        <Button text="Editar Perfil" onClick={() => setEdit(true)} />
      </div>
    )}
    
    </div>
  )
}
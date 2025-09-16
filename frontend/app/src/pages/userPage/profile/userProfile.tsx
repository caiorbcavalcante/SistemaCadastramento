import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "../../../components/input/Input";
import { Button } from "../../../components/button/Button";

interface User {
  id: number;
  name: string;
  password: string;
}
export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", password: "" });
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
        setForm({ name: res.data.name, password: "" })
        setError(null);
      } catch {
        setError("Erro ao buscar usuário");
      }
    };

    fetchUser();
  }, [id_user, token]);

  const handleSave = async () => {
    setError(null);

    if (!form.name || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:3000/user/${id_user}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEdit(false);
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

        <Button text="Salvar" onClick={handleSave} />

        <Button text="Cancelar" onClick={() => {
        setForm({ name: user.name, password: user.password });
        setEdit(false);
        setError(null);
        }} />
   
      </div>
    ):(
      <div> 
        <p>Nome:{user.name}</p>
        <p>password:{user.password}</p>

        <Button text="Editar Perfil" onClick={() => setEdit(true)} />
      </div>
    )}
    
    </div>
  )
}
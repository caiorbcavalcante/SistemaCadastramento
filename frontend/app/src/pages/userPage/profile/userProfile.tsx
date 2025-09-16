import axios from "axios";
import React, { useEffect, useState } from "react";

export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
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
        setForm({ name: res.data.name, password: "" }); // senha não exposta
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
    
    </div>
  );
};

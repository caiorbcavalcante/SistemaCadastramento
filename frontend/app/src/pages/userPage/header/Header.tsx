import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <h1>Mrs. Costa</h1>
      <div className="header-buttons">
        <button className="edit-profile-btn" onClick={() => navigate("/userProfile")}>
          Editar Perfil
        </button>
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </div>
    </header>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}></h1>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Sair Da Conta
      </button>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: "#0c0202ff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    margin: 0,
    fontSize: "10px",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    fontSize: "15px",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

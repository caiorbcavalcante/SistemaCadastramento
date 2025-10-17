import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // Envia código para o e-mail
  const handleSendCode = async () => {
    try {
      await axios.post("http://localhost:3000/send-code", { email });
      setSent(true);
      alert("Código enviado! Verifique seu e-mail.");
    } catch {
      alert("Erro ao enviar código.");
    }
  };

  // Verifica se o código está correto
  const handleVerifyCode = async () => {
    try {
      const res = await axios.post("http://localhost:3000/verify-code", { email, code });
      if (res.data.valid) {
        alert("Código confirmado! Agora redefina sua senha.");
        navigate("/new-password"); // vai pra sua tela de redefinir
      } else {
        alert("Código incorreto.");
      }
    } catch {
      alert("Erro ao verificar código.");
    }
  };

  return (
      <div className="forgot-container">
      <div className="forgot-card">
        {!sent ? (
          <>
            <h2 className="forgot-title">Esqueceu sua senha?</h2>
            <p className="forgot-subtitle">Digite seu e-mail para receber um código de recuperação</p>
            <input
              type="email"
              className="forgot-input"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="forgot-button" onClick={handleSendCode}>
              Enviar código
            </button>
          </>
        ) : (
          <>
            <h2 className="forgot-title">Verificação de código</h2>
            <p className="forgot-subtitle">Digite o código de 4 dígitos enviado para seu e-mail</p>
            <input
              className="forgot-input"
              placeholder="Código de 4 dígitos"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="forgot-button" onClick={handleVerifyCode}>
              Confirmar código
            </button>
          </>
      )}
    </div>
    </div>
  );
};

import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

const codes: Record<string, string> = {}; // Armazena { email: código }

router.post("/send-code", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "E-mail é obrigatório." });

  // Gera um código de 4 dígitos
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  codes[email] = code;

  // Configura o transporte do Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Sistema Educa On" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Código de recuperação de senha",
      text: `Seu código de verificação é: ${code}`,
    });

    return res.json({ message: "Código enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao enviar e-mail." });
  }
});

router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  if (!email || !code)
    return res.status(400).json({ message: "E-mail e código são obrigatórios." });

  if (codes[email] === code) {
    delete codes[email];
    return res.json({ valid: true, message: "Código válido!" });
  } else {
    return res.status(400).json({ valid: false, message: "Código inválido." });
  }
});

export { router as resetPasswordRouter };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordRouter = void 0;
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
exports.resetPasswordRouter = router;
const codes = {}; // Armazena { email: código }
router.post("/send-code", async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ message: "E-mail é obrigatório." });
    // Gera um código de 4 dígitos
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    codes[email] = code;
    // Configura o transporte do Nodemailer
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // 🔥 ignora o erro de certificado
        },
    });
    try {
        await transporter.sendMail({
            from: `"Sistema Barbearia" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Código de recuperação de senha",
            text: `Seu código de verificação é: ${code}`,
        });
        return res.json({ message: "Código enviado com sucesso!" });
    }
    catch (error) {
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
    }
    else {
        return res.status(400).json({ valid: false, message: "Código inválido." });
    }
});

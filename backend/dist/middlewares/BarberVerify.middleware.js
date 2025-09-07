"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarberVerify = BarberVerify;
const jsonwebtoken_1 = require("jsonwebtoken");
function BarberVerify(request, response, next) {
    const tokenBarber = request.headers.authorization;
    if (!tokenBarber) {
        return response.status(401).json({ message: "token inválido" });
    }
    const [, token] = tokenBarber.split(" ");
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        next();
    }
    catch {
        return response.status(401).json({ message: "Token inválido ou expirado" });
    }
}

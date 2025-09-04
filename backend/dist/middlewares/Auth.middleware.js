"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationVerify = AuthenticationVerify;
const jsonwebtoken_1 = require("jsonwebtoken");
function AuthenticationVerify(request, response, next) {
    const authToken = request.headers.authorization;
    if (authToken) {
        const [, token] = authToken.split(" ");
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            return next();
        }
        catch (error) {
            response.status(401).json({ message: "Token inválido ou expirado" });
        }
    }
    response.status(401).json({ message: "Token inválido" });
}

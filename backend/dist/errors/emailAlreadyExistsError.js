"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = void 0;
class EmailAlreadyExistsError extends Error {
    constructor(message = "Email já cadastrado em outra conta.") {
        super(message);
        this.name = "EmailAlreadyExistsError";
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;

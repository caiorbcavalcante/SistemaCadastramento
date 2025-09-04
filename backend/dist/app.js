"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_routes_1 = require("./routes/Users.routes");
const Barbers_routes_1 = require("./routes/Barbers.routes");
const app_data_source_1 = require("./app-data-source");
const Appointment_routes_1 = require("./routes/Appointment.routes");
const Services_routes_1 = require("./routes/Services.routes");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(Users_routes_1.userRouter);
server.use(Barbers_routes_1.barbersRouter);
server.use(Appointment_routes_1.appointmentRouter);
server.use(Services_routes_1.serviceRouter);
app_data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source iniciado!');
    server.listen(3000, () => {
        console.log('Server rodando na porta 3000');
    });
})
    .catch((err) => {
    console.error('Error durante a inicialização', err);
});

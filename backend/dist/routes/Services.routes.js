"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = require("express");
const Services_controller_1 = require("../controllers/Services.controller");
exports.serviceRouter = (0, express_1.Router)();
const serviceController = new Services_controller_1.ServicesController;
exports.serviceRouter.get("/service/:id_service", serviceController.getService);
exports.serviceRouter.get("/service", serviceController.getAllServices);
exports.serviceRouter.post("/service", serviceController.createService);
exports.serviceRouter.patch("/service/:id_service", serviceController.updateService);
exports.serviceRouter.delete("/service/:id_service", serviceController.deleteService);
//serviceRouter.get("/service/user/:id_user", serviceController.getServiceByUser)
//serviceRouter.get("/service/barber/:id_barber", serviceController.getServiceByBarber)

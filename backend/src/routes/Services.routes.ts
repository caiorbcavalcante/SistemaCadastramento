import { Router } from "express";
import { ServicesController } from "../controllers/Services.controller";

export const serviceRouter = Router();

const serviceController = new ServicesController;

serviceRouter.get("/service/:id_service", serviceController.getService)
serviceRouter.get("/service", serviceController.getAllServices)
serviceRouter.post("/service", serviceController.createService)
serviceRouter.patch("/service/:id_service", serviceController.updateService)
serviceRouter.delete("/service/:id_service", serviceController.deleteService)
serviceRouter.get("/service/id_user/:id_service", serviceController.getServiceByUser)
serviceRouter.get("/service/id_barber/:id_service", serviceController.getServiceByBarber)

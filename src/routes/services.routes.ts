import { Router } from "express";
import { ServicesController } from "../controllers/Services.controller";

export const serviceRouter = Router();

const serviceController = new ServicesController;

serviceRouter.get("/user:id_user", serviceController.getService)
serviceRouter.get("/user", serviceController.getAllServices)
serviceRouter.post("/user", serviceController.createService)
serviceRouter.patch("/user:id_user", serviceController.updateService)
serviceRouter.delete("/user:id_user", serviceController.deleteService)

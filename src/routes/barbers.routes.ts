import { Router } from 'express'


export const barbersRouter = Router()

barbersRouter.get("/barbers")
barbersRouter.get("/barbers/:id")
barbersRouter.post("/barbers")
barbersRouter.patch("/barbers:id")
barbersRouter.delete("/barbers/:id")
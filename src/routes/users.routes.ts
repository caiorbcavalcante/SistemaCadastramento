import { Router } from 'express'


export const userRouter = Router()

userRouter.get("/user")
userRouter.get("/user/:id")
userRouter.patch("/user")
userRouter.delete("/user")
userRouter.get("/appointments")
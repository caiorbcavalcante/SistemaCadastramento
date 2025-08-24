import { Router } from 'express'


export const userRouter = Router()

userRouter.get("/user")
userRouter.patch("/user")
userRouter.delete("/user")
userRouter.get("/appointments")
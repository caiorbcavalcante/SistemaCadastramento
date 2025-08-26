import { Router } from 'express'
import { UserController } from '../controllers/Users.controller'


export const userRouter = Router()

const userController = new UserController()

userRouter.get("/user:id", userController.getUser)
userRouter.get("/user", )
userRouter.post("/user")
userRouter.patch("/user")
userRouter.delete("/user")

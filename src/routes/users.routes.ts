import { Router } from 'express'
import { UserController } from '../controllers/Users.controller'


export const userRouter = Router()

const userController = new UserController()

userRouter.get("/user:id_user", userController.getUser)
userRouter.get("/user", userController.getAllUser)
userRouter.post("/user", userController.createUser)
userRouter.patch("/user:id_user", userController.updateUser)
userRouter.delete("/user:id_user")

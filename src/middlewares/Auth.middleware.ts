import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface requestAuth extends Request {
        userId:string
}

export function Authentication(request: requestAuth, response: Response, next: NextFunction){
        const authToken = request.headers.authorization

        if(authToken){
        const [, token] = authToken.split(" ")

                try{
                        const payload = verify(token, "token") as {id_user:String}
                        request.userId = payload.id_user as string
                        return next()

                }catch(error){
                        response.status(401).json({ message: "Token inválido ou expirado" })
                }

        
        }

        response.status(401).json({message: "Token inválido"})
}



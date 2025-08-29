import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";


export function BarberVerify(request: Request, response: Response, next: NextFunction) {
    const tokenBarber = request.headers.authorization

    if(!tokenBarber){
        return response.status(401).json({message:"token inválido"})
    }
    const [, token] = tokenBarber.split(" ")
    try{ 
    const payload = verify(token,process.env.JWT_SECRET as string) as {id_barber:number, role:"string"}
        next()

    }catch{
         return response.status(401).json({ message: "Token inválido ou expirado" });
    }
}
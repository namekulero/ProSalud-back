import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

interface Payload {
    _id: number;
    iat : number;
    exp : number;
}


export const TokenValidator = (req: Request , res: Response, next: NextFunction) =>{
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Acceso denegado');
    
    const payload = jwt.verify(token, process.env.TOKEN_SECRET ||' ') as Payload;
    console.log("Payload ",payload)
    req.id = payload._id;
    console.log("Petición ",req.id)
    next()
}
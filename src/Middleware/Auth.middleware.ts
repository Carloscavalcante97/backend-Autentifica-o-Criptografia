import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import "dotenv/config";

export default class Authentification {
  static async auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(!authorization){
      return res.status(401).json({error: "Token não informado"});
    }
    const token = authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.SECRET||'');

        next();
    } catch (error) {
        console.error(error);
        if(error instanceof TokenExpiredError){
          return res.status(401).json({error: "Token expirado"});
        }else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: "Token inválido" })};
    
        return res.status(500).json({error: "erro interno do sistema"});
    }
  }
}
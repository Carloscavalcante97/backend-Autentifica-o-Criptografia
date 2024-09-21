import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserRepository from '../Repositories/User-Repositories';
import jwt from 'jsonwebtoken';
 
const userRepository = new UserRepository()

export default class LoginController {
    async logar(req: Request, res: Response){
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: "Preencha todos os campos"})
        }
        try {
            const user = await userRepository.findByEmail(email);
            if(!user){
                return res.status(404).json({error: "Usuário não encontrado"})
            }
            const validatePassword = await bcrypt.compare(password, user.password)
            if(!validatePassword){
                return res.status(400).json({error: "dados inválidos"})
            }
            const token  = jwt.sign({id: user.id}, process.env.SECRET||"", {
                expiresIn: '1h'
            })
            return res.json({user, token})
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({error: erro.message})
            
        }
        

    }
}
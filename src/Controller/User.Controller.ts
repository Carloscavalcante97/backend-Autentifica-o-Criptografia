import { Request, Response } from "express";
import  User from "../Models/User.Models";
import UserRepository from "../Repositories/User-Repositories";
import bcrypt from 'bcrypt'

const userRepository = new UserRepository()
export default class UserController { 
    async create(req: Request, res: Response){
        try {
            const {name, email, password} = req.body
            if(!name || !email || !password){
                return res.status(400).json({error: "Preencha todos os campos"})
            }
            const emailExistente = await userRepository.findByEmail(email)
            if(emailExistente){
                return res.status(400).json({error: "Email já cadastrado"})
            }
            
           const user = new User({name, email, password})
           const hashPassword = await bcrypt.hash(user.password,10)
           user.password = hashPassword;
           console.log(password);
           
            await userRepository.create(user);
            
            return res.status(201).json(user);
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({error: erro.message})
        }
    }

    async listar(req: Request, res: Response){
        try {
            const users = await userRepository.find()
        return res.json(users)
        } catch (error) {
            const erro = error as Error
            return res.status(400).json({error: erro.message})
        }
        
    }

    async detalhar(req: Request, res: Response){
        try {
            const {id} = req.params
       
        const user = await userRepository.findByid(id)
        if(!user){
            return res.status(404).json({error: "Usuário não encontrado"})}
        return res.json(user);
        } catch (error) {
            const erro = error as Error
			return res.status(400).json({
				message: erro.message})
        }
        
    }
 
  
}
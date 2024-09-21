import { Router } from 'express'
import UserController from './Controller/User.Controller';
import LoginController from './Controller/Login.Controller';
import Authentification from './Middleware/Auth.middleware';

const routes = Router()
const userController = new UserController();
const loginController = new LoginController();

routes.post('/users', userController.create );
routes.post('/login', loginController.logar);

routes.use( Authentification.auth );

routes.get('/user', userController.listar);
routes.get('/user/:id', userController.detalhar);
export default routes
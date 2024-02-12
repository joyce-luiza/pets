import { Router } from 'express';
import AuthenticationFacade from '../../app/facades/AuthenticationFacade';
import AuthenticationController from '../../app/controllers/AuthenticationController';
const authenticationRoutes = Router();

const controller = new AuthenticationController();
const facade = new AuthenticationFacade(controller);

authenticationRoutes.post('/login', facade.doLogin);

export default authenticationRoutes;

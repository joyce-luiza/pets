import { Router } from 'express';
import AuthenticationFacade from '../../app/facades/AuthenticationFacade';
import AuthenticationController from '../../app/controllers/AuthenticationController';
import authMiddleware from '../../config/auth';
const authenticationRoutes = Router();

const controller = new AuthenticationController();
const facade = new AuthenticationFacade(controller);

authenticationRoutes.post('/login', facade.doLogin);
authenticationRoutes.post(
	'/verify/password',
	authMiddleware,
	facade.verifyPassword
);

export default authenticationRoutes;

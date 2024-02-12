import { Router } from 'express';
import adopterRoutes from './Adopters/routes';
import authenticationRoutes from './Authentication/routes';

const routes = Router();

routes.use('/auth', authenticationRoutes);
routes.use('/adopter', adopterRoutes);

export default routes;

import { Router } from 'express';
import adopterRoutes from './Adopters/routes';

const routes = Router();

routes.use('/adopter', adopterRoutes);

export default routes;

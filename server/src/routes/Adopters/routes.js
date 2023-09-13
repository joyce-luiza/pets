import { Router } from 'express';
import AdopterFacade from '../../app/facades/AdopterFacade';
import AdopterController from '../../app/controllers/AdopterController';
const adopterRoutes = Router();

const controller = new AdopterController();
const facade = new AdopterFacade(controller);

adopterRoutes.post('/', facade.create);
adopterRoutes.get('/:id', facade.getById);

export default adopterRoutes;

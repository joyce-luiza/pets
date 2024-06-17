import { Router } from 'express';
import AnimalFacade from '../../app/facades/AnimalFacade';
import AnimalController from '../../app/controllers/AnimalController';
import { multerUpload } from '../../config/multer';
import authMiddleware from '../../middlewares/auth';

const animalRoutes = Router();

const controller = new AnimalController();
const facade = new AnimalFacade(controller);

animalRoutes.post('/', multerUpload.array('files'), facade.create);
animalRoutes.get('/table', facade.findAllToTableView);
animalRoutes.put(
  '/',
  multerUpload.array('files'),
  authMiddleware,
  facade.update
);
animalRoutes.delete('/:id', authMiddleware, facade.deleteLogicallyById);
animalRoutes.get('/:id', facade.getById);

//não esquecer o authMiddleware

export default animalRoutes;

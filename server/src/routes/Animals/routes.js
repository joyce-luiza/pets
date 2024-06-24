import { Router } from 'express';
import AnimalFacade from '../../app/facades/AnimalFacade';
import AnimalController from '../../app/controllers/AnimalController';
import { multerUpload } from '../../config/multer';
import authMiddleware from '../../middlewares/auth';

const animalRoutes = Router();

const controller = new AnimalController();
const facade = new AnimalFacade(controller);

animalRoutes.post(
  '/',
  authMiddleware,
  multerUpload.array('files'),
  facade.create
);
animalRoutes.get(
  '/table',
  multerUpload.array('files'),
  facade.findAllToTableView
);
animalRoutes.get('/:id', multerUpload.array('files'), facade.getById);
animalRoutes.put(
  '/',
  multerUpload.array('files'),
  authMiddleware,
  facade.update
);
animalRoutes.delete('/:id', authMiddleware, facade.deleteLogicallyById);

//não esquecer o authMiddleware

export default animalRoutes;

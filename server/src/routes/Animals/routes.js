import { Router } from 'express';
import AnimalFacade from '../../app/facades/AnimalFacade';
import AnimalController from '../../app/controllers/AnimalController';
import { multerUpload } from '../../config/multer';
import authMiddleware from '../../middlewares/auth';
import { AnimalFileRepository } from '../../app/repositories';

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
  authMiddleware,
  facade.findAllToTableView
);
animalRoutes.get('/card/list', facade.findAllCardListView);
animalRoutes.get('/:id', multerUpload.array('files'), facade.getById);
animalRoutes.put(
  '/',
  multerUpload.array('files'),
  authMiddleware,
  facade.update
);
animalRoutes.delete('/:id', authMiddleware, facade.deleteLogicallyById);
animalRoutes.get('/details/:id', facade.GetAnimalDetailsById);
animalRoutes.delete('/files/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await AnimalFileRepository.deleteById(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default animalRoutes;

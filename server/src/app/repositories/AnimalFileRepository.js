import { AnimalFile } from '../../database/models';
import AbstractRepository from '../abstract/AbstractRepository';

class AnimalFileRepository extends AbstractRepository {
  constructor() {
    super(AnimalFile);
  }
}

export default new AnimalFileRepository();

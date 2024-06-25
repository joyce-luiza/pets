import { AnimalFile } from '../../database/models';
import AbstractRepository from '../abstract/AbstractRepository';

class AnimalFileRepository extends AbstractRepository {
    constructor() {
        super(AnimalFile);
        this.findAllByAnimalId = this.findAllByAnimalId.bind(this);
    }

    async findAllByAnimalId(animalId) {
        return this.findAllWithProperties({ animalId: animalId });
    }
}

export default new AnimalFileRepository();

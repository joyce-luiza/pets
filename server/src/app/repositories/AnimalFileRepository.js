import { AnimalFile } from '../../database/models';
import AbstractRepository from '../abstract/AbstractRepository';
import { ref, deleteObject } from 'firebase/storage';
import firebaseStorage from '../../config/firebase';

class AnimalFileRepository extends AbstractRepository {
  constructor() {
    super(AnimalFile);
    this.findAllByAnimalId = this.findAllByAnimalId.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async findAllByAnimalId(animalId) {
    return this.findAllWithProperties({ animalId: animalId });
  }

  async deleteById(id) {
    const animalFile = await this.findById(id);
    if (!animalFile) throw new Error('File not found');

    // Delete the file from storage
    const fileRef = ref(firebaseStorage, animalFile.fileUrl);
    await deleteObject(fileRef);

    // Delete from the database
    await this.delete({ id });
  }
}

export default new AnimalFileRepository();

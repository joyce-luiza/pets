import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Animal } from '../../../app/domains';
import { AnimalAdapter } from '../../../app/domains/adapters';
import { ref, deleteObject } from 'firebase/storage';
import firebaseStorage from '../../../config/firebase';
/**
 * Set animal status to Inactive
 *
 * @extends AbstractStrategy
 */
export default class DeleteFilesByAnimalIdStrategy extends AbstractStrategy {
  /**
   *
   * @param {AnimalRepository} animalRepository
   */
  constructor(animalRepository) {
    super();
    this.animalRepository = animalRepository;
  }

  /**
   *
   * @param {Animal} data - The data object containing id property.
   */
  async execute({ data }) {
    const existingFiles = await this.animalFileRepository.findById(data.id);
    const existingFilePaths = existingFiles.map((file) => file.fileUrl);

    const deletePromises = existingFilePaths.map(async (filePath) => {
      const fileRef = ref(firebaseStorage, filePath);
      await deleteObject(fileRef);
    });

    await Promise.all(deletePromises);

    const filesPromises = data.files.map((file) =>
      uploadFile({ file, folder: `/animals/${data.id}` })
    );

    const resolvedPromises = await Promise.all(filesPromises);
  }
}

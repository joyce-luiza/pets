export default class AnimalFile {
  constructor({
    id = "",
    fileUrl = "",
    animalId = "",
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id;
    this.fileUrl = fileUrl;
    this.animalId = animalId;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

export default class AdopterPreference {
  constructor({
    id = null,
    userId = null,
    animalTypes = {},
    animalSizes = {},
    animalColors = {},
    animalSexes = {},
    animalAgeGroups = {},
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id ? id : null;
    this.userId = userId ? userId : null;
    this.animalTypes = animalTypes;
    this.animalSizes = animalSizes;
    this.animalColors = animalColors;
    this.animalSexes = animalSexes;
    this.animalAgeGroups = animalAgeGroups;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

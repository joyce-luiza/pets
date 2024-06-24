export default class AdopterPreferencesAdapter {
  constructor({
    animalTypes = null,
    animalSizes = null,
    animalColors = null,
    animalSexes = null,
    animalAgeGroups = null,
  } = {}) {
    this.animalTypes = animalTypes;
    this.animalSizes = animalSizes;
    this.animalColors = animalColors;
    this.animalSexes = animalSexes;
    this.animalAgeGroups = animalAgeGroups;
  }
}

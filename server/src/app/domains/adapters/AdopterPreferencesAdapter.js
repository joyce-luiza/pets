export default class AdopterPreferencesAdapter {
  constructor({
    animalTypes = {},
    animalSizes = {},
    animalColors = {},
    animalSexes = {},
    animalAgeGroups = {},
  } = {}) {
    this.animalTypes = animalTypes;
    this.animalSizes = animalSizes;
    this.animalColors = animalColors;
    this.animalSexes = animalSexes;
    this.animalAgeGroups = animalAgeGroups;
  }
}

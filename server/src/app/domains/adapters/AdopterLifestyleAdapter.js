export default class AdopterLifestyleAdapter {
  constructor({
    totalPets = null,
    routine = null,
    travelFrequency = null,
  } = {}) {
    this.totalPets = totalPets;
    this.routine = routine;
    this.travelFrequency = travelFrequency;
  }
}

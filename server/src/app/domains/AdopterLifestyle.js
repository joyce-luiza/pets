export default class AdopterLifestyle {
  constructor({
    id = null,
    adopterId = null,
    totalPets = 0,
    routine = null,
    travelFrequency = null,
  } = {}) {
    this.id = id;
    this.adopterId = adopterId;
    this.totalPets = totalPets;
    this.routine = routine;
    this.travelFrequency = travelFrequency;
  }
}

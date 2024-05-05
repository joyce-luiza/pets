import { Adopter, Address, AdopterPreference, AdopterLifestyle } from "./";

export default class AdopterComplement {
  constructor({
    adopter = {},
    address = {},
    preferences = {},
    lifestyle = {},
  } = {}) {
    this.adopter = new Adopter(adopter);
    this.address = new Address(address);
    this.preferences = new AdopterPreference(preferences);
    this.lifestyle = new AdopterLifestyle(lifestyle);
  }
}

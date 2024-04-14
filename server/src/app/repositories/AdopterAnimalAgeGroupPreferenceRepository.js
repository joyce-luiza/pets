import { AdopterAnimalAgeGroupPreference } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdopterAnimalAgeGroupPreferenceRepository extends AbstractRepository {
  constructor() {
    super(AdopterAnimalAgeGroupPreference);
  }
}

export default new AdopterAnimalAgeGroupPreferenceRepository();

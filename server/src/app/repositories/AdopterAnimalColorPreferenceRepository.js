import { AdopterAnimalColorPreference } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdopterAnimalColorPreferenceRepository extends AbstractRepository {
  constructor() {
    super(AdopterAnimalColorPreference);
  }
}

export default new AdopterAnimalColorPreferenceRepository();

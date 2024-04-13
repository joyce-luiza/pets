import { AdopterAnimalTypePreference } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdopterAnimalTypePreferenceRepository extends AbstractRepository {
  constructor() {
    super(AdopterAnimalTypePreference);
  }
}

export default new AdopterAnimalTypePreferenceRepository();

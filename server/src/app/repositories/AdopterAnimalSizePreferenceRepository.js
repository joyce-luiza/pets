import { AdopterAnimalSizePreference } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdopterAnimalSizePreferenceRepository extends AbstractRepository {
  constructor() {
    super(AdopterAnimalSizePreference);
  }
}

export default new AdopterAnimalSizePreferenceRepository();

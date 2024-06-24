import { AdopterAnimalSexPreference } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdopterAnimalSexPreferenceRepository extends AbstractRepository {
  constructor() {
    super(AdopterAnimalSexPreference);
  }
}

export default new AdopterAnimalSexPreferenceRepository();

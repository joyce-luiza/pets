import { AdopterPreference } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdopterPreferenceRepository extends AbstractRepository {
  constructor() {
    super(AdopterPreference);
  }
}

export default new AdopterPreferenceRepository();

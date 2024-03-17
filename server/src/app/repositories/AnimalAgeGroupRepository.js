import { AnimalAgeGroup } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AnimalAgeGroupRepository extends AbstractRepository {
  constructor() {
    super(AnimalAgeGroup);
  }
}

export default new AnimalAgeGroupRepository();

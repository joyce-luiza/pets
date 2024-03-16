import { AnimalType } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AnimalTypeRepository extends AbstractRepository {
  constructor() {
    super(AnimalType);
  }
}

export default new AnimalTypeRepository();

import { AnimalColor } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AnimalColorRepository extends AbstractRepository {
  constructor() {
    super(AnimalColor);
  }
}

export default new AnimalColorRepository();

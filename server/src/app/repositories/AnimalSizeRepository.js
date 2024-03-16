import { AnimalSize } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AnimalSizeRepository extends AbstractRepository {
  constructor() {
    super(AnimalSize);
  }
}

export default new AnimalSizeRepository();

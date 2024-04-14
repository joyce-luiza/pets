import { Lifestyle } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class LifestyleRepository extends AbstractRepository {
  constructor() {
    super(Lifestyle);
  }
}

export default new LifestyleRepository();

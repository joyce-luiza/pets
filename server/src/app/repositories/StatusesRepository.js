import { Status } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class StatusesRepository extends AbstractRepository {
  constructor() {
    super(Status);
  }
}

export default new StatusesRepository();

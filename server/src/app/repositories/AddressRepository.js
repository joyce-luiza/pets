import { Address } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AddressRepository extends AbstractRepository {
  constructor() {
    super(Address);
  }
}

export default new AddressRepository();

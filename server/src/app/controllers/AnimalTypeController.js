import { FindAllAnimalTypesFactory } from "../../routes/AnimalTypes/factories";

export default class AnimalTypeController {
  constructor() {
    this.findAll = this.findAll.bind(this);
  }

  async findAll(req, res, next) {
    const factory = new FindAllAnimalTypesFactory();
    const result = await factory.execute();
    res.json(result);
  }
}

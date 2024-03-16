import { FindAllAnimalSizesFactory } from "../../routes/AnimalSizes/factories";

export default class AnimalSizeController {
  constructor() {
    this.findAll = this.findAll.bind(this);
  }

  async findAll(req, res, next) {
    const factory = new FindAllAnimalSizesFactory();
    const result = await factory.execute();
    res.json(result);
  }
}

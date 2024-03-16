import { FindAllAnimalColorsFactory } from "../../routes/AnimalColors/factories";

export default class AnimalColorController {
  constructor() {
    this.findAll = this.findAll.bind(this);
  }

  async findAll(req, res, next) {
    const factory = new FindAllAnimalColorsFactory();
    const result = await factory.execute();
    res.json(result);
  }
}

import { FindAllAnimalAgeGroupsFactory } from "../../routes/AnimalAgeGroups/factories";

export default class AnimalAgeGroupController {
  constructor() {
    this.findAll = this.findAll.bind(this);
  }

  async findAll(req, res, next) {
    const factory = new FindAllAnimalAgeGroupsFactory();
    const result = await factory.execute();
    res.json(result);
  }
}

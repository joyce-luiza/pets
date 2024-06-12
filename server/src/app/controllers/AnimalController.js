import {
  CreateAnimalFactory,
  FindAllToTableViewFactory,
} from "../../routes/Animals/factories";
import { Pagination } from "../domains";
import { AnimalAdapter } from "../domains/adapters";

export default class AdopterController {
  constructor() {
    this.create = this.create.bind(this);
    this.findAllToTableView = this.findAllToTableView.bind(this);
  }

  async create(req, res, next) {
    const domain = new AnimalAdapter({ ...req.body, files: req.files });
    const factory = new CreateAnimalFactory();
    const result = await factory.execute(domain, req.loggedUserInfo);
    res.json(result);
  }

  async findAllToTableView(req, res, next) {
    const domain = new Pagination(req.query);
    const factory = new FindAllToTableViewFactory();
    const result = await factory.execute(domain, req.loggedUserInfo);
    res.json(result);
  }
}
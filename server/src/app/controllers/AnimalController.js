import {
  CreateAnimalFactory,
  FindAllToTableViewFactory,
  UpdateAnimalFactory,
  DeleteLogicallyByAnimalIdFactory,
  GetByIdAnimalFactory,
} from '../../routes/Animals/factories';
import { Pagination, Animal } from '../domains';
import { AnimalAdapter } from '../domains/adapters';

export default class AnimalController {
  constructor() {
    this.create = this.create.bind(this);
    this.findAllToTableView = this.findAllToTableView.bind(this);
    this.update = this.update.bind(this);
    this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
    this.getById = this.getById.bind(this);
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
  async update(req, res, next) {
    const data = JSON.parse(req.body.data);

    const animal = new AnimalAdapter({ ...data, files: req.files });
    const factory = new UpdateAnimalFactory();
    const result = await factory.execute(animal, req.loggedUserInfo);

    res.json(result);
  }

  async deleteLogicallyById(req, res, next) {
    const animal = new AnimalAdapter({ id: req.params.id });

    const factory = new DeleteLogicallyByAnimalIdFactory();
    const result = await factory.execute(animal, req.loggedUserInfo);
    res.json(result);
  }

  async getById(req, res, next) {
    const animal = new AnimalAdapter({ id: req.params.id });
    const factory = new GetByIdAnimalFactory();
    const result = await factory.execute(animal);
    res.json(result);
  }

  /*async deleteFilesById(req, res, next) {
    const animal = new AnimalAdapter({ id: req.params.id });

    const factory = new DeleteFilesByAnimalIdFactory();
    const result = await factory.execute(animal, req.loggedUserInfo);
    res.json(result);
  }*/
}

import Status from "../../database/models/status";
import { STATUS } from "../constants";
import sanitize from "../utils/sanitize";

export default class AbstractRepository {
  constructor(model) {
    this.model = model;
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
    this.findAll = this.findAll.bind(this);
    this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
    this.update = this.update.bind(this);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async getActiveStatusId() {
    return (await Status.findOne({ where: { code: STATUS.ACTIVE } })).id;
  }

  async getInactiveStatusId() {
    return (await Status.findOne({ where: { code: STATUS.INACTIVE } })).id;
  }

  async getSuspendedStatusId() {
    return (await Status.findOne({ where: { code: STATUS.SUSPENDED } })).id;
  }

  async create(data) {
    delete data.id;
    return await this.model.create(data);
  }

  async countGeneric(options) {
    return await this.model.count(options);
  }

  async findById(id) {
    return await this.model.findOne({ where: { id } });
  }

  async findByProp(prop, value) {
    return await this.model.findOne({ where: { [`${prop}`]: value } });
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findOne(options) {
    return await this.model.findOne(options);
  }

  async bulkCreate(dataArray) {
    return await this.model.bulkCreate(dataArray);
  }

  async deleteLogicallyById(id) {
    return await this.model.update(
      {
        statusId: this.getInactiveStatusId(),
      },
      {
        where: { id },
      }
    );
  }

  async update(value, whereCondition) {
    const { id, ...rest } = value;

    return await this.model.update(
      { ...sanitize({ ...rest }) },
      {
        where: whereCondition,
      }
    );
  }
}

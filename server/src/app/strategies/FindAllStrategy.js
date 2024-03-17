import AbstractRepository from "../abstract/AbstractRepository";
import AbstractStrategy from "../abstract/AbstractStrategy";

/**
 * Strategy to find all data of an database table without pagination
 *
 * @extends AbstractStrategy
 */
export default class FindAllStrategy extends AbstractStrategy {
  /**
   * @param {AbstractRepository} repository - An AbstractRepository instance.
   */
  constructor(repository) {
    super();
    this.repository = repository;
  }

  async execute() {
    const data = await this.repository.findAll();
    return data;
  }
}

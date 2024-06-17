import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationRepository } from "../../../app/repositories";
import { Pagination } from "../../../app/domains";

/**
 * Strategy to get all organizations city - states (uf)
 *
 * @extends AbstractStrategy
 */
export default class GetAllOrganizationsCityStateStrategy extends AbstractStrategy {
  /**
   * @param {OrganizationRepository} organizationRepository - An instance of AbstractRepository
   */
  constructor(organizationRepository) {
    super();
    this.organizationRepository = organizationRepository;
  }

  /**
   * @param {Pagination} data - Pagination filter
   */
  async execute(data) {
    const organizationsCityStates =
      await this.organizationRepository.getAllCityStates(data);

    return organizationsCityStates;
  }
}

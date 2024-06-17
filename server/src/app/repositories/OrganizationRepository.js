import { Organization } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class OrganizationRepository extends AbstractRepository {
  constructor() {
    super(Organization);
    this.createOrganization = this.createOrganization.bind(this);
    this.findActiveOrganizationById =
      this.findActiveOrganizationById.bind(this);
  }

  async createOrganization({ name, cnpj, description, email, phoneNumber }) {
    return await this.create({
      name,
      cnpj,
      description,
      email,
      phoneNumber,
      statusId: await this.getActiveStatusId(),
    });
  }

  async findActiveOrganizationById(id) {
    return await this.findOne({
      where: {
        id,
        statusId: await this.getActiveStatusId(),
      },
    });
  }

  async getAllCityStates({ page, size, isPaginated, conditions }) {
    const query = `
        SELECT 
            a.id,
            a.state 
        FROM
            "Organizations" o 
        INNER JOIN "Addresses" a ON
            a.organization_id = o.id
    `;

    const animals = await this.paginateSqlQuery(query, page, size, isPaginated);
    return animals;
  }
}

export default new OrganizationRepository();

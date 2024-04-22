import { Organization } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class OrganizationRepository extends AbstractRepository {
    constructor() {
        super(Organization);
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
}

export default new OrganizationRepository();

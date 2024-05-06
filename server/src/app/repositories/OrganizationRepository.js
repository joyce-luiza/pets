import { Organization } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class OrganizationRepository extends AbstractRepository {
    constructor() {
        super(Organization);
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
}

export default new OrganizationRepository();

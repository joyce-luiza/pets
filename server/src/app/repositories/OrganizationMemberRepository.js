import { OrganizationMember } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class OrganizationMemberRepository extends AbstractRepository {
    constructor() {
        super(OrganizationMember);
        this.findActiveOrganizationMemberById =
            this.findActiveOrganizationMemberById.bind(this);
        this.findMembersByOrganizationId =
            this.findMembersByOrganizationId.bind(this);
    }

    async createOrganizationMember({
        firstName,
        lastName,
        birthDate,
        email,
        password,
        phoneNumber,
        role,
        organizationId,
        imageUrl = null,
    }) {
        return await this.create({
            firstName,
            lastName,
            birthDate,
            email,
            password,
            phoneNumber,
            role,
            organizationId,
            imageUrl,
            statusId: await this.getActiveStatusId(),
        });
    }

    async findActiveOrganizationMemberById(id) {
        return await this.findOne({
            where: {
                id,
                organizationId,
                statusId: await this.getActiveStatusId(),
            },
        });
    }

    async findMembersByOrganizationId(organizationId) {
        return await this.findAllWithProperties({
            organizationId: organizationId,
            statusId: await this.getActiveStatusId(),
        });
    }
}

export default new OrganizationMemberRepository();

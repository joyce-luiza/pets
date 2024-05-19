import { OrganizationInvite } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class OrganizationInviteRepository extends AbstractRepository {
    constructor() {
        super(OrganizationInvite);
        this.createOrganizationInvite =
            this.createOrganizationInvite.bind(this);
        this.findActiveOrganizationInviteById =
            this.findActiveOrganizationInviteById.bind(this);
    }

    async createOrganizationInvite({
        invitedEmail,
        token,
        organizationId,
        organizationAdminId,
    }) {
        return await this.create({
            invitedEmail,
            token,
            organizationId,
            organizationAdminId,
            statusId: await this.getActiveStatusId(),
        });
    }

    async findActiveOrganizationInviteById(id) {
        return await this.findOne({
            where: {
                id,
                statusId: await this.getActiveStatusId(),
            },
        });
    }
}

export default new OrganizationInviteRepository();

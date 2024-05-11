export default class OrganizationInvite {
    constructor({
        id = null,
        invitedEmail = "",
        token = "",
        organizationAdminId = "",
        organizationId = "",
        statusId = "",
        createdAt = new Date(),
        updatedAt = new Date(),
    } = {}) {
        this.id = id ? id : null;
        this.invitedEmail = invitedEmail;
        this.token = token;
        this.organizationAdminId = organizationAdminId;
        this.organizationId = organizationId;
        this.statusId = statusId;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}

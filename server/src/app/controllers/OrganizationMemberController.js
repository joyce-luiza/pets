import {
    CreateOrganizationMemberFactory,
    GetByIdOrganizationMemberFactory,
    GetByEmailOrganizationMemberFactory,
    UpdateProfileImageMemberFactory,
    GetOrganizationMembersByIdFactory,
    UpdateMemberRoleFactory,
    UpdateOrganizationMemberFactory,
    DeleteLogicallyByOrganizationMemberIdFactory,
} from "../../routes/OrganizationMembers/factories";

import {
    VerifyOrganizationInviteEmailFactory,
    DeactivateOrganizationInviteByEmailFactory,
} from "../../routes/OrganizationInvites/factories";

import {
    File,
    OrganizationMember,
    Organization,
    OrganizationInvite,
} from "../domains";

export default class OrganizationMemberController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getMembersByOrganizationId =
            this.getMembersByOrganizationId.bind(this);
        this.update = this.update.bind(this);
        this.updateProfileImage = this.updateProfileImage.bind(this);
        this.updateMemberRole = this.updateMemberRole.bind(this);
        this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
    }

    async create(req, res, next) {
        const member = new OrganizationMember(req.body);
        const token = req.body.token;

        // Verify if email is equal to the invited email
        const verifyEmail = new VerifyOrganizationInviteEmailFactory();
        await verifyEmail.execute(member.email, token);

        // Create organization member
        const factory = new CreateOrganizationMemberFactory();
        const result = await factory.execute(member);

        // Deactivate all invites related to member's email
        const invitedEmail = new OrganizationInvite({
            invitedEmail: member.email,
        });
        const deactiveInvites =
            new DeactivateOrganizationInviteByEmailFactory();
        await deactiveInvites.execute(invitedEmail);

        res.json(result);
    }

    async getById(req, res, next) {
        const member = new OrganizationMember({ id: req.params.id });
        const factory = new GetByIdOrganizationMemberFactory();
        const result = await factory.execute(member);
        res.json(result);
    }

    async getByEmail(req, res, next) {
        const member = new OrganizationMember({ email: req.params.email });
        const factory = new GetByEmailOrganizationMemberFactory();
        const result = await factory.execute(member);
        res.json(result);
    }

    async getMembersByOrganizationId(req, res, next) {
        const org = new Organization({ id: req.params.id });
        const factory = new GetOrganizationMembersByIdFactory();
        const result = await factory.execute(org);
        res.json(result);
    }

    async update(req, res, next) {
        const member = new OrganizationMember({
            ...req.body,
            id: req.loggedUserInfo.userId,
        });
        const factory = new UpdateOrganizationMemberFactory();
        const result = await factory.execute(member);
        res.json(result);
    }

    async updateProfileImage(req, res, next) {
        const memberFile = new File(req.file);
        const factory = new UpdateProfileImageMemberFactory();
        const result = await factory.execute(
            memberFile,
            {},
            req.loggedUserInfo
        );
        res.json(result);
    }

    async updateMemberRole(req, res, next) {
        const member = new OrganizationMember(req.body);
        const factory = new UpdateMemberRoleFactory();
        const result = await factory.execute(member, {}, req.loggedUserInfo);
        res.json(result);
    }

    async deleteLogicallyById(req, res, next) {
        const member = new OrganizationMember({ id: req.params.id });
        const factory = new DeleteLogicallyByOrganizationMemberIdFactory();
        const result = await factory.execute(member, {}, req.loggedUserInfo);
        res.json(result);
    }
}

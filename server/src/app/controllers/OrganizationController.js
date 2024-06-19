import {
    CreateOrganizationFactory,
    GetByIdOrganizationFactory,
    GetByCNPJOrganizationFactory,
    CreateOrganizationComplementFactory,
    GetOrganizationComplementFactory,
    UpdateOrganizationFactory,
    UpdateOrganizationAddressFactory,
} from "../../routes/Organizations/factories";
import {
    Organization,
    OrganizationMember,
    OrganizationComplement,
    Address,
} from "../domains";
import {
    CreateOrganizationMemberFactory,
    DeactivateAllOrganizationMembersFactory,
} from "../../routes/OrganizationMembers/factories";
import {
    CreateOrganizationInviteFactory,
    SendInvitationEmailFactory,
} from "../../routes/OrganizationInvites/factories/";
import { MEMBER_ROLE } from "../../constants";
import DeleteLogicallyByOrganizationIdFactory from "../../routes/Organizations/factories/DeleteLogicallyByOrganizationIdFactory";

export default class OrganizationController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.createAdminMember = this.createAdminMember.bind(this);
        this.sendInvites = this.sendInvites.bind(this);
        this.getByCNPJ = this.getByCNPJ.bind(this);
        this.createComplement = this.createComplement.bind(this);
        this.getComplement = this.getComplement.bind(this);
        this.update = this.update.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
    }

    async create(req, res, next) {
        const org = new Organization(req.body.organization);
        const member = new OrganizationMember(req.body.organizationMember);
        const invites = req.body.invites;
        const address = req.body.address;

        // Create organization
        const factory = new CreateOrganizationFactory();
        const organization = await factory.execute(org);

        // Create organization complement
        const id = organization.id;
        const complement = new OrganizationComplement({
            organization,
            address,
        });
        await this.createComplement(complement);

        // Create organization admin
        const admin = await this.createAdminMember({ id, member });
        await this.sendInvites(invites, id, admin.id);
        res.json(organization);
    }

    async createAdminMember({ id, member }) {
        const factory = new CreateOrganizationMemberFactory();
        const result = await factory.execute({
            ...member,
            role: MEMBER_ROLE.ADMIN,
            organizationId: id,
        });
        return result;
    }

    async sendInvites(emails, organizationId, organizationAdminId) {
        let invites = [];
        emails.forEach((email) => {
            const invite = {
                invitedEmail: email,
                organizationId: organizationId,
                organizationAdminId: organizationAdminId,
            };
            invites.push(invite);
        });

        const factory = new CreateOrganizationInviteFactory();
        const emailSender = new SendInvitationEmailFactory();

        await Promise.all(
            invites.map(async (invite) => {
                const createdInvite = await factory.execute(invite);
                await emailSender.execute(createdInvite);
            })
        );
    }

    async getById(req, res, next) {
        const org = new Organization({ id: req.params.id });
        const factory = new GetByIdOrganizationFactory();
        const result = await factory.execute(org);
        res.json(result);
    }

    async getByCNPJ(req, res, next) {
        const org = new Organization({ cnpj: req.params.cnpj });
        const factory = new GetByCNPJOrganizationFactory();
        const result = await factory.execute(org);
        res.json(result);
    }

    async createComplement({ organization, address }) {
        const complement = new OrganizationComplement({
            organization,
            address,
        });
        const factory = new CreateOrganizationComplementFactory();
        await factory.execute(complement);
    }

    async getComplement(req, res, next) {
        const organizationId = new Organization({ id: req.params.id });
        const factory = new GetOrganizationComplementFactory();
        const result = await factory.execute(organizationId);
        res.json(result);
    }

    async updateAddress(req, res, next) {
        const address = new Address({
            ...req.body,
        });
        const factory = new UpdateOrganizationAddressFactory();
        const result = await factory.execute(address);
        res.json(result);
    }

    async update(req, res, next) {
        const organization = new Organization({
            ...req.body,
            id: req.loggedUserInfo.organizationId,
        });
        const factory = new UpdateOrganizationFactory();
        const result = await factory.execute(organization);
        res.json(result);
    }

    async deleteLogicallyById(req, res, next) {
        const org = new Organization({ id: req.params.id });

        // Deactivates all organization members
        const deactiveMembers = new DeactivateAllOrganizationMembersFactory();
        await deactiveMembers.execute(org);

        // Deactivates organization
        const factory = new DeleteLogicallyByOrganizationIdFactory();
        const result = await factory.execute(org, req.loggedUserInfo);
        res.json(result);
    }
}

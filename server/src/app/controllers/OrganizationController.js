import {
    CreateOrganizationFactory,
    GetByIdOrganizationFactory,
    GetByCNPJOrganizationFactory,
    CreateOrganizationComplementFactory,
    GetOrganizationComplementFactory,
    UpdateOrganizationFactory,
} from "../../routes/Organizations/factories";
import {
    Organization,
    OrganizationMember,
    OrganizationComplement,
} from "../domains";
import CreateOrganizationMemberFactory from "../../routes/OrganizationMembers/factories/CreateOrganizationMemberFactory";
import {
    CreateOrganizationInviteFactory,
    SendInvitationEmailFactory,
} from "../../routes/OrganizationInvites/factories/";
import { MEMBER_ROLE } from "../../constants";

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
    }

    async create(req, res, next) {
        const org = new Organization(req.body.organization);
        const member = new OrganizationMember(req.body.organizationMember);
        const invites = req.body.invites;
        const address = req.body.address;
        const factory = new CreateOrganizationFactory();
        const organization = await factory.execute(org);
        const id = organization.id;
        const complement = new OrganizationComplement({
            organization,
            address,
        });
        await this.createComplement(complement);
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

    async update(req, res, next) {
        const organization = new Organization({
            ...req.body,
            id: req.loggedUserInfo.organizationId,
        });
        const factory = new UpdateOrganizationFactory();
        const result = await factory.execute(organization);
        res.json(result);
    }
}

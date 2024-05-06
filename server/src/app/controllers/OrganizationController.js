import {
    CreateOrganizationFactory,
    GetByIdOrganizationFactory,
    GetByCNPJOrganizationFactory,
    CreateOrganizationComplementFactory,
    GetOrganizationComplementFactory,
} from "../../routes/Organizations/factories";
import {
    Organization,
    OrganizationMember,
    OrganizationComplement,
} from "../domains";
import CreateOrganizationMemberFactory from "../../routes/OrganizationMembers/factories/CreateOrganizationMemberFactory";
import { MEMBER_ROLE } from "../../constants";

export default class OrganizationController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
    }

    async create(req, res, next) {
        const org = new Organization(req.body.organization);
        const member = new OrganizationMember(req.body.organizationMember);
        const address = req.body.address;
        const factory = new CreateOrganizationFactory();
        const organization = await factory.execute(org);
        const id = organization.id;
        const complement = new OrganizationComplement({
            organization,
            address,
        });
        await this.createComplement(complement);
        await this.createAdminMember({ id, member }, res);
    }

    async createAdminMember({ id, member }, res) {
        const factory = new CreateOrganizationMemberFactory();
        const result = await factory.execute({
            ...member,
            role: MEMBER_ROLE.ADMIN,
            organizationId: id,
        });
        res.json(result);
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
}

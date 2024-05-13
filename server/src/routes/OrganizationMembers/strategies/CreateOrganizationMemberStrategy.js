import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMember } from "../../../app/domains";

/**
 * Strategy to create an Organization Member
 *
 * @extends AbstractStrategy
 */
export default class CreateOrganizationMemberStrategy extends AbstractStrategy {
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }
    /**
     * Create an organization member.
     *
     * @param {OrganizationMember} data - The organization member object.
     */

    async execute(data) {
        const orgMember =
            await this.organizationMemberRepository.createOrganizationMember(
                data
            );
        if (!orgMember) {
            this.throwError("Erro ao criar membro da organização");
        }

        const { id, email, firstName, lastName, organizationId } =
            new OrganizationMember(orgMember);

        const result = { id, email, firstName, lastName, organizationId };

        return result;
    }
}

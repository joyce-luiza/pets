import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { OrganizationMember } from "../../../app/domains";

/**
 * Strategy to update an Organization Member
 *
 * @extends AbstractStrategy
 */
export default class UpdateOrganizationMemberStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationMemberRepository} organizationMemberRepository - An instance of AbstractRepository
     */
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * @param {OrganizationMember} data - Organization Member domain object
     */

    async execute(data) {
        // Remove the role field from the data to ensure it is not updated
        const { role, ...updateData } = data;

        // Update the organization member's information
        const updated = await this.organizationMemberRepository.update(
            updateData,
            {
                id: data.id,
            }
        );

        // If the update failed, throw an error
        if (!updated) {
            this.throwError(
                "Não foi possível atualizar as informações do membro da organização."
            );
            return;
        }

        const member = await this.organizationMemberRepository.findById(
            data.id
        );

        const { id, email, firstName, lastName, phoneNumber, birthDate } =
            new OrganizationMember(member);

        const result = {
            id,
            email,
            firstName,
            lastName,
            phoneNumber,
            birthDate,
        };

        return result;
    }
}

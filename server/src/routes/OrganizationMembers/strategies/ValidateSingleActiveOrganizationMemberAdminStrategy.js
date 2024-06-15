import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMemberRepository } from "../../../app/repositories";

/**
 * Strategy to validate if the admin member to be deleted is the only active admin in the organization.
 *
 * @extends AbstractStrategy
 */
export default class ValidateSingleActiveOrganizationMemberAdminStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationMemberRepository} organizationMemberRepository
     */
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * Verify if the admin member to be deleted is the only active admin in the organization.
     *
     * @param {string} id- The ID of the member to be deleted.
     * @throws {Error} Throws an error if the admin is the only active admin in the organization.
     */
    async execute({ id }) {
        // Find the member to be deleted
        const member = await this.organizationMemberRepository.findById(id);

        if (!member) {
            this.throwError("Membro não encontrado.");
        }

        // Check if the member to be deleted is an admin
        if (member.role !== "ADMIN") {
            return;
        }

        // Find all active admins in the organization
        const activeAdminsCount =
            await this.organizationMemberRepository.countGeneric({
                where: {
                    organizationId: member.organizationId,
                    statusId:
                        await this.organizationMemberRepository.getActiveStatusId(),
                    role: "ADMIN",
                },
            });

        // If the admin to be deleted is the only active admin, throw an error
        if (activeAdminsCount === 1) {
            this.throwError(
                "Você é o único administrador ativo. Para deletar a conta, é necessário inativar a organização."
            );
        }
    }
}

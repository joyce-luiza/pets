import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import {
    OrganizationRepository,
    OrganizationMemberRepository,
} from "../../../app/repositories";
import { Organization } from "../../../app/domains";

/**
 * @extends AbstractStrategy
 */
export default class ValidateCNPJExistenceStrategy extends AbstractStrategy {
    /**
     * @param {OrganizationRepository} organizationRepository
     * @param {OrganizationMemberRepository} organizationMemberRepository
     */
    constructor(organizationRepository, organizationMemberRepository) {
        super();
        this.organizationRepository = organizationRepository;
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * @param {Organization} organization
     * @throws {Error}
     */

    async execute({ cnpj }, dto, loggedUserInfo) {
        const org = await this.organizationRepository.findOne({
            where: {
                cnpj,
                statusId: await this.organizationRepository.getActiveStatusId(),
            },
        });

        if (loggedUserInfo) {
            const loggedOrganization =
                await this.organizationRepository.findById(
                    loggedUserInfo.organizationId
                );

            if (cnpj === loggedOrganization.cnpj) return;
        }

        if (org) {
            this.throwError("O CNPJ informado já está cadastrado.");
        }
    }
}

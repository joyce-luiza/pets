import AbstractStrategy from "../../../app/abstract/AbstractStrategy";

/**
 * Strategy to validate if member's email already exists.
 *
 * @extends AbstractStrategy
 */
export default class ValidateEmailExistenceStrategy extends AbstractStrategy {
    constructor(organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
    }

    /**
     * Verify email existence on Adopters table
     *
     * @param {Object} data - The data object containing email property.
     * @param {string} data.email - The member email.
     * @throws {Error} Throws an error if the member's email already existence.
     */
    async execute({ email }) {
        const orgMember = await this.organizationMemberRepository.findOne({
            where: {
                email,
                statusId:
                    await this.organizationMemberRepository.getActiveStatusId(),
            },
        });

        if (orgMember) {
            this.throwError("O email informado já está em uso.");
        }
    }
}

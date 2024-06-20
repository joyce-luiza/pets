import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationInvite } from "../../../app/domains";
import bcrypt from "bcryptjs";

/**
 * Strategy to create an Organization Invite
 *
 * @extends AbstractStrategy
 */
export default class CreateOrganizationInviteStrategy extends AbstractStrategy {
    constructor(organizationInviteRepository) {
        super();
        this.organizationInviteRepository = organizationInviteRepository;
    }
    /**
     * Create an organization invite.
     *
     * @param {OrganizationInvite} invited - The organization invite object.
     */

    async execute(invited) {
        // Generates a random number
        const randomNumber = Math.random().toString(36).slice(-8);

        // Encrypts the random number and tokenizes it
        const token = bcrypt.hashSync(randomNumber, 8);

        // Create the invite
        const invite =
            await this.organizationInviteRepository.createOrganizationInvite({
                ...invited,
                token: token,
            });

        if (!invite) {
            this.throwError("Erro ao criar o convite.");
        }

        const result = new OrganizationInvite(invite);

        return result;
    }
}

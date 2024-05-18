import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { LoggedUser } from "../../../app/domains";
/**
 * Strategy to search for an active adopter by id.
 *
 * @extends AbstractStrategy
 */
export default class FindAdopterByIdStrategy extends AbstractStrategy {
    constructor(adopterRepository) {
        super();
        this.adopterRepository = adopterRepository;
    }

    /**
     * Find adopter by id
     *
     * @param {AdopterComplement} data - The data object containing id property.
     * @param {string} data.id - The adopter id.
     * @param {LoggedUser} loggedUserInfo - The adopter id.
     * @throws {Error} Throws an error if the adopter doesn't exists.
     */
    async execute({ id }, _, loggedUserInfo) {
        const adopter = await this.adopterRepository.findActiveAdopterById(
            id ? id : loggedUserInfo.userId
        );

        if (!adopter) {
            this.throwError(
                "Adotante não encontrado. Verifique o identificador enviado."
            );
        }

        return adopter;
    }
}

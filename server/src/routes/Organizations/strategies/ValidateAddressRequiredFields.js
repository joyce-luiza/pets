import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationComplement, Address } from "../../../app/domains";

/**
 * Strategy to validade required Address fields
 *
 * @extends AbstractStrategy
 */
export default class ValidateAddressRequiredFields extends AbstractStrategy {
    constructor() {
        super();
    }

    /**
     * @param {OrganizationComplement} data - Object containing address information
     * @param {Address} data.address - Object containing specific address information
     */
    async execute({ address }) {
        const generateError = (fieldName) => {
            this.throwError(
                `O campo '${fieldName}' é obrigatório e não foi informado.`,
                400
            );
        };

        if (!address.residenceType) {
            generateError("Tipo de residência");
        }

        if (!address.cep) {
            generateError("CEP");
        }

        if (!address.street) {
            generateError("Nome da rua");
        }

        if (!address.number) {
            generateError("Número da residência");
        }

        if (!address.city) {
            generateError("Nome da cidade");
        }

        if (!address.state) {
            generateError("Nome do estado");
        }
    }
}

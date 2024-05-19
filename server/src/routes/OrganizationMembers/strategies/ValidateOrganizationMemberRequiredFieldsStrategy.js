import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { OrganizationMember } from "../../../app/domains";

/**
 * Strategy to validade required Organization Member fields
 *
 * @extends AbstractStrategy
 */

export default class ValidateOrganizationMemberRequiredFieldsStrategy extends AbstractStrategy {
    constructor() {
        super();
    }

    /**
     * @param {OrganizationMember} data - Organization Member domain object
     */

    async execute(data) {
        const generateError = (fieldName) => {
            this.throwError(
                `O campo '${fieldName}' é obrigatório e não foi informado.`,
                400
            );
        };

        if (!data.firstName) {
            generateError("Primeiro nome");
        }
        if (!data.lastName) {
            generateError("Sobrenome");
        }
        if (!data.role) {
            generateError("Role");
        }
        if (!data.organizationId) {
            generateError("Id da organização");
        }
        if (!data.birthDate) {
            generateError("Data de nascimento");
        }
        if (!data.email) {
            generateError("E-mail");
        }
        if (!data.password) {
            generateError("Senha");
        }
        if (!data.phoneNumber) {
            generateError("Número de telefone");
        }
    }
}

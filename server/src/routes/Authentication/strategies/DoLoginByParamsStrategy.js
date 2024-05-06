import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import auth from "../../../config/auth";
import jwt from "jsonwebtoken";
import {
    AdopterRepository,
    OrganizationMemberRepository,
} from "../../../app/repositories";
import { Login } from "../../../app/domains";
import { USER_TYPE } from "../../../constants";

/**
 * Strategy to do login by params
 *
 * @extends AbstractStrategy
 */
export default class DoLoginByParamsStrategy extends AbstractStrategy {
    /**
     *
     * @param {AdopterRepository} adopterRepository
     * @param {OrganizationMemberRepository} organizationMemberRepository
     */
    constructor(adopterRepository, organizationMemberRepository) {
        super();
        this.organizationMemberRepository = organizationMemberRepository;
        this.adopterRepository = adopterRepository;
    }

    /**
     * @param {Login} data - Login domain object
     */
    async execute({ email, password, token, type }) {
        if (token) return;

        let result = {};
        let { id, firstName, organizationId, role } = {};

        switch (type) {
            case USER_TYPE.ADOPTER:
                const adopter = await this.adopterRepository.findByProp(
                    "email",
                    email
                );

                if (!adopter) {
                    this.throwError(
                        "Erro ao realizar login. Email ou senha incorretos.",
                        500
                    );
                }

                if (!(await adopter.checkPassword(password))) {
                    this.throwError("O email ou senha estão incorretos.", 400);
                }

                ({ id, firstName } = adopter);

                result = {
                    id,
                    firstName,
                    email,
                    type,
                    token: jwt.sign({ id, type }, auth.secret, {
                        expiresIn: auth.expiresIn,
                    }),
                };
                break;
            case USER_TYPE.ORGANIZATION:
                const orgMember =
                    await this.organizationMemberRepository.findByProp(
                        "email",
                        email
                    );

                if (!orgMember) {
                    this.throwError(
                        "Erro ao realizar login. Email ou senha incorretos.",
                        500
                    );
                }
                if (!(await orgMember.checkPassword(password))) {
                    this.throwError("O email ou senha estão incorretos.", 400);
                }

                ({ id, firstName, organizationId, role } = orgMember);

                result = {
                    id,
                    firstName,
                    email,
                    type,
                    role,
                    organizationId,
                    token: jwt.sign({ id, type }, auth.secret, {
                        expiresIn: auth.expiresIn,
                    }),
                };

            default:
                break;
        }

        return result;
    }
}

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

        switch (type) {
            case USER_TYPE.ADOPTER: {
                const adopter = await this.adopterRepository.findOne({
                    where: {
                        email,
                        statusId:
                            await this.adopterRepository.getActiveStatusId(),
                    },
                });

                if (!adopter) {
                    this.throwError(
                        "Erro ao realizar login. Email ou senha incorretos.",
                        500
                    );
                }

                if (!(await adopter.checkPassword(password))) {
                    this.throwError("O email ou senha estão incorretos.", 400);
                }

                result = {
                    id: adopter.id,
                    firstName: adopter.firstName,
                    email,
                    type,
                    imageUrl: adopter.imageUrl ? adopter.imageUrl : "",
                    token: jwt.sign({ id: adopter.id, type }, auth.secret, {
                        expiresIn: auth.expiresIn,
                    }),
                };
                break;
            }
            case USER_TYPE.ORGANIZATION: {
                const orgMember =
                    await this.organizationMemberRepository.findOne({
                        where: {
                            email,
                            statusId:
                                await this.organizationMemberRepository.getActiveStatusId(),
                        },
                    });

                if (!orgMember) {
                    this.throwError(
                        "Erro ao realizar login. Email ou senha incorretos.",
                        500
                    );
                }
                if (!(await orgMember.checkPassword(password))) {
                    this.throwError("O email ou senha estão incorretos.", 400);
                }

                const { organizationId, role } = orgMember;

                result = {
                    id: orgMember.id,
                    firstName: orgMember.firstName,
                    email,
                    type,
                    role,
                    imageUrl: orgMember.imageUrl ? orgMember.imageUrl : "",
                    organizationId,
                    token: jwt.sign(
                        { id: orgMember.id, type, organizationId, role },
                        auth.secret,
                        {
                            expiresIn: auth.expiresIn,
                        }
                    ),
                };
                break;
            }

            default:
                this.throwError(
                    "Não foi possível prosseguir com a solicitação.",
                    401
                );
                break;
        }

        return result;
    }
}

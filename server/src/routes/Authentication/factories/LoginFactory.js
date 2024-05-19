import AbstractFactory from "../../../app/abstract/AbstractFactory";
import DoLoginWithTokenStrategy from "../strategies/DoLoginWithTokenStrategy";
import ValidateLoginRequiredFieldsStrategy from "../strategies/ValidateLoginRequiredFieldsStrategy";
import DoLoginByParamsStrategy from "../strategies/DoLoginByParamsStrategy";
import {
    AdopterRepository,
    OrganizationMemberRepository,
} from "../../../app/repositories";

class LoginFactory extends AbstractFactory {
    constructor() {
        super([
            new ValidateLoginRequiredFieldsStrategy(),
            new DoLoginWithTokenStrategy(
                AdopterRepository,
                OrganizationMemberRepository
            ),
            new DoLoginByParamsStrategy(
                AdopterRepository,
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default LoginFactory;

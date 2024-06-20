import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { GetOrganizationMembersByIdStrategy } from "../strategies";

class GetOrganizationMembersByIdFactory extends AbstractFactory {
    constructor() {
        super([
            new GetOrganizationMembersByIdStrategy(
                OrganizationMemberRepository
            ),
        ]);
    }
}

export default GetOrganizationMembersByIdFactory;

import { Organization, Address } from "./";

export default class OrganizationComplement {
    constructor({ organization = {}, address = {} } = {}) {
        this.organization = new Organization(organization);
        this.address = new Address(address);
    }
}

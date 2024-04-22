export default class Organization {
    constructor({
        id = null,
        name = "",
        cnpj = "",
        description = "",
        email = "",
        phoneNumber = "",
        statusId = "",
        createdAt = new Date(),
        updatedAt = new Date(),
    } = {}) {
        this.id = id ? id : null;
        this.name = name;
        this.cnpj = cnpj;
        this.description = description;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.statusId = statusId;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}

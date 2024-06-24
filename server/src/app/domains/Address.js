export default class Address {
  constructor({
    id = null,
    adopterId = null,
    organizationId = null,
    street = "",
    city = "",
    state = "",
    cep = "",
    residenceType = "",
    number = "",
    complement = "",
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id ? id : null;
    this.adopterId = adopterId;
    this.organizationId = organizationId;
    this.street = street;
    this.city = city;
    this.state = state;
    this.cep = cep;
    this.residenceType = residenceType;
    this.number = number;
    this.complement = complement;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

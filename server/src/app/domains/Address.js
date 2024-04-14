export default class Address {
  constructor({
    id = null,
    adopterId = "",
    street = "",
    city = "",
    state = "",
    cep = "",
    residenceType = "",
    number = "",
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id ? id : null;
    this.adopterId = adopterId;
    this.street = street;
    this.city = city;
    this.state = state;
    this.cep = cep;
    this.residenceType = residenceType;
    this.number = number;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

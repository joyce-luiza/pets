export default class AdopterAddressResult {
  constructor({
    id = null,
    street = "",
    city = "",
    state = "",
    cep = "",
    residenceType = "",
    number = "",
    complement = "",
  } = {}) {
    this.id = id ? id : null;
    this.street = street;
    this.city = city;
    this.state = state;
    this.cep = cep;
    this.residenceType = residenceType;
    this.complement = complement;
    this.number = number;
  }
}

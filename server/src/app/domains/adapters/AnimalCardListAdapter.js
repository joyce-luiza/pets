export default class AnimalCardListAdapter {
  constructor({
    id = "",
    name = "",
    sex = "",
    type = "",
    city = "",
    state = "",
    files = [],
    birthDate = new Date(),
  } = {}) {
    this.id = id;
    this.name = name;
    this.sex = sex;
    this.type = type;
    this.files = files;
    this.city = city;
    this.state = state;
    this.birthDate = new Date(birthDate);
  }
}

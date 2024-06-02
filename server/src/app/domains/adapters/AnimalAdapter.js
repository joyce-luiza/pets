export default class AnimalAdapter {
  constructor({
    id = "",
    name = "",
    description = "",
    medicalInformation = "",
    sex = "",
    type = "",
    size = "",
    color = "",
    ageGroup = "",
    status = "",
    files = [],
    organizationId = "",
    birthDate = new Date(),
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.medicalInformation = medicalInformation;
    this.sex = sex;
    this.type = type;
    this.size = size;
    this.color = color;
    this.ageGroup = ageGroup;
    this.status = status;
    this.files = files;
    this.organizationId = organizationId;
    this.birthDate = new Date(birthDate);
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

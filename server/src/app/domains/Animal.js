export default class Animal {
  constructor({
    id = "",
    name = "",
    description = "",
    medicalInformation = "",
    sex = "",
    birthDate = new Date(),
    organizationId = "",
    typeId = "",
    sizeId = "",
    colorId = "",
    ageGroupId = "",
    statusId = "",
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.medicalInformation = medicalInformation;
    this.sex = sex;
    this.birthDate = new Date(birthDate);
    this.organizationId = organizationId;
    this.typeId = typeId;
    this.sizeId = sizeId;
    this.colorId = colorId;
    this.ageGroupId = ageGroupId;
    this.statusId = statusId;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

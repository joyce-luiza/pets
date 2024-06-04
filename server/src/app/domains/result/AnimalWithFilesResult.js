export default class AnimalWithFilesResult {
  constructor({
    id = "",
    name = "",
    description = "",
    medicalInformation = "",
    sex = "",
    birthDate = new Date(),
    type = "",
    size = "",
    ageGroup = "",
    color = "",
    files = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.medicalInformation = medicalInformation;
    this.sex = sex;
    this.birthDate = new Date(birthDate);
    this.type = type;
    this.size = size;
    this.ageGroup = ageGroup;
    this.color = color;
    this.files = files.map((file) => ({
      id: file.id,
      fileUrl: file.fileUrl,
    }));
  }
}

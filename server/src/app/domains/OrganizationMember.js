export default class OrganizationMember {
  constructor({
    id = null,
    role = "",
    firstName = "",
    lastName = "",
    birthDate = new Date(),
    email = "",
    password = "",
    phoneNumber = "",
    statusId = "",
    organizationId = "",
    imageUrl = "",
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id ? id : null;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = new Date(birthDate);
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.statusId = statusId;
    this.imageUrl = imageUrl;
    this.organizationId = organizationId;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

import { Status } from "../../database/models";

export default class Adopter {
  constructor({
    id = null,
    firstName = "",
    lastName = "",
    birthDate = new Date(),
    email = "",
    phoneNumber = "",
    statusId = "",
    imageUrl = "",
    file = {},
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id ? id : null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.statusId = statusId;
    this.imageUrl = imageUrl;
    this.file = file;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

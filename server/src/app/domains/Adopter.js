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
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.id = id ? id : null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = new Date(birthDate);
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.statusId = statusId;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

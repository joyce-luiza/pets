import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Animal } from "../../../app/domains";
import { AnimalAdapter } from "../../../app/domains/adapters";
import { USER_TYPE } from "../../../constants";

/**
 * Strategy to validate required Animal fields
 *
 * @extends AbstractStrategy
 */
export default class ValidateAnimalRequiredFieldsStrategy extends AbstractStrategy {
  constructor() {
    super();
  }

  /**
   * @param {AnimalAdapter} data - Animal adapter object
   */
  async execute(data, dto, loggedUserInfo) {
    const generateError = (fieldName) => {
      this.throwError(
        `O campo '${fieldName}' é obrigatório e não foi informado.`,
        400
      );
    };

    if (loggedUserInfo.type !== USER_TYPE.ORGANIZATION) {
      this.throwError(
        `O usuário atual não possui acesso a essa funcionalidade.`,
        400
      );
    }

    if (!loggedUserInfo.organizationId) {
      generateError("Organização");
    }
    if (!data.name) {
      generateError("Nome");
    }
    if (!data.description) {
      generateError("Descrição");
    }
    if (!data.birthDate) {
      generateError("Data de nascimento");
    }
    if (!data.sex) {
      generateError("Sexo");
    }
    if (!data.type) {
      generateError("Tipo");
    }
    if (!data.size) {
      generateError("Porte");
    }
    if (!data.color) {
      generateError("Tamanho");
    }
    if (!data.medicalInformation) {
      generateError("Informações médicas");
    }
    if (!data.status) {
      generateError("Disponibilidade");
    }
    if (!data.files.length) {
      this.throwError(
        `É obrigatório o anexo de ao menos uma foto do animal.`,
        400
      );
    }

    return new Animal({
      ...dto,
      organizationId: loggedUserInfo.organizationId,
      name: data.name,
      description: data.description,
      birthDate: data.birthDate,
      sex: data.sex,
      medicalInformation: data.medicalInformation,
    });
  }
}

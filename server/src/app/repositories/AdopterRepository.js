import {
  Adopter,
  AnimalType,
  AnimalAgeGroup,
  AnimalColor,
  AnimalSize,
  AdopterAnimalTypePreference,
  AdopterAnimalAgeGroupPreference,
  AdopterAnimalColorPreference,
  AdopterAnimalSizePreference,
} from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdopterRepository extends AbstractRepository {
  constructor() {
    super(Adopter);
    this.findActiveAdopterById = this.findActiveAdopterById.bind(this);
  }

  async createAdopter({
    firstName,
    lastName,
    birthDate,
    email,
    password,
    phoneNumber,
  }) {
    return await this.create({
      firstName,
      lastName,
      birthDate,
      email,
      password,
      phoneNumber,
      statusId: await this.getActiveStatusId(),
    });
  }

  async findActiveAdopterById(id) {
    return await this.findOne({
      where: {
        id,
        statusId: await this.getActiveStatusId(),
      },
    });
  }

  // GET ADOPTER PREFERENCES
  // ===========================
  async getPreferencesByAdopterId(adopterId) {
    const animalTypes = await this.getAdopterAnimalTypesPreferences(adopterId);
    const animalSizes = await this.getAdopterAnimalSizesPreferences(adopterId);
    const animalColors = await this.getAdopterAnimalColorsPreferences(
      adopterId
    );
    const animalAgeGroups = await this.getAdopterAnimalAgeGroupsPreferences(
      adopterId
    );
    const animalSexes = await this.getAdopterAnimalSexesPreferences(adopterId);

    const convertArrayToObject = (array, keyField) => {
      if (array.length === 0) {
        return null;
      }

      const result = {};
      array.forEach((item) => {
        result[item[keyField]] = true;
      });
      return result;
    };
    const result = {
      animalTypes: convertArrayToObject(animalTypes, "title"),
      animalSizes: convertArrayToObject(animalSizes, "title"),
      animalColors: convertArrayToObject(animalColors, "title"),
      animalAgeGroups: convertArrayToObject(animalAgeGroups, "title"),
      animalSexes: convertArrayToObject(animalSexes, "title"),
    };

    return result;
  }

  async getAdopterAnimalTypesPreferences(adopterId) {
    const query = `
      SELECT
          AT.title
      FROM "AdopterPreferences" AP
          INNER JOIN "AdopterAnimalTypePreferences" AATP ON AP.id = AATP.adopter_preference_id
          INNER JOIN "AnimalTypes" AT ON AATP.animal_type_id = AT.id
      WHERE adopter_id = :adopterId
    `;

    const result = await this.executeQuery({
      query,
      replacements: { adopterId },
      type: "SELECT",
    });

    return result;
  }

  async getAdopterAnimalSizesPreferences(adopterId) {
    const query = `
      SELECT
          ASZ.title
      FROM "AdopterPreferences" AP
          INNER JOIN "AdopterAnimalSizePreferences" AATP ON AP.id = AATP.adopter_preference_id
          INNER JOIN "AnimalSizes" ASZ ON AATP.animal_size_id = ASZ.id
      WHERE adopter_id = :adopterId
    `;

    const result = await this.executeQuery({
      query,
      replacements: { adopterId },
      type: "SELECT",
    });

    return result;
  }

  async getAdopterAnimalColorsPreferences(adopterId) {
    const query = `
      SELECT
          AC.title
      FROM "AdopterPreferences" AP
          INNER JOIN "AdopterAnimalColorPreferences" AACP ON AP.id = AACP.adopter_preference_id
          INNER JOIN "AnimalColors" AC ON AACP.animal_color_id = AC.id
      WHERE adopter_id = :adopterId
    `;

    const result = await this.executeQuery({
      query,
      replacements: { adopterId },
      type: "SELECT",
    });

    return result;
  }

  async getAdopterAnimalAgeGroupsPreferences(adopterId) {
    const query = `
      SELECT
          AAG.title
      FROM "AdopterPreferences" AP
          INNER JOIN "AdopterAnimalAgeGroupPreferences" AAGP ON AP.id = AAGP.adopter_preference_id
          INNER JOIN "AnimalAgeGroups" AAG ON AAGP.animal_age_group_id = AAG.id
      WHERE adopter_id = :adopterId

    `;

    const result = await this.executeQuery({
      query,
      replacements: { adopterId },
      type: "SELECT",
    });

    return result;
  }

  async getAdopterAnimalSexesPreferences(adopterId) {
    const query = `
      SELECT
          AASP.animal_sex as "title"
      FROM "AdopterPreferences" AP
          INNER JOIN "AdopterAnimalSexPreferences" AASP ON AP.id = AASP.adopter_preference_id
      WHERE adopter_id = :adopterId
    `;

    const result = await this.executeQuery({
      query,
      replacements: { adopterId },
      type: "SELECT",
    });

    return result;
  }

  // ===========================

  async getLifestyleByAdopterId(adopterId) {
    const query = `
      SELECT
          L.routine,
          L.total_pets       AS "totalPets",
          L.travel_frequency AS "travelFrequency"
      FROM "Adopters" A
          INNER JOIN "Lifestyles" L ON A.id = L.adopter_id
      WHERE
          L.adopter_id = :adopterId
    `;

    const result = await this.executeQuery({
      query,
      type: "SELECT",
      replacements: { adopterId },
    });

    return result;
  }
}

export default new AdopterRepository();

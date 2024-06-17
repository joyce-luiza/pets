import { Animal } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AnimalRepository extends AbstractRepository {
  constructor() {
    super(Animal);
    this.getWithFilesById = this.getWithFilesById.bind(this);
  }

  async getWithFilesById({ id }) {
    const replacements = { id };
    const animalQuery = `
      SELECT
        a.id,
        a.name,
        a.description,
        a.medical_information AS "medicalInformation",
        a.sex,
        a.birth_date AS "birthDate",
        at.title AS "type",
        asz.title AS "size",
        aag.title AS "ageGroup",
        ac.title AS "color"
      FROM
        "Animals" a
      INNER JOIN "AnimalTypes" at ON at.id = a.type_id
      INNER JOIN "AnimalSizes" asz ON asz.id = a.size_id
      INNER JOIN "AnimalColors" ac ON ac.id = a.color_id
      INNER JOIN "AnimalAgeGroups" aag ON aag.id = a.age_group_id
      WHERE
        a.id = :id
    `;

    const [animal] = await this.query(animalQuery, "SELECT", {
      replacements,
    });

    if (!animal) {
      return false;
    }

    const animalFilesQuery = `
      SELECT 
        af.id,
        af.file_url AS "fileUrl",
        af.animal_id AS "animalId",
        af.created_at AS "createdAt",
        af.updated_at AS "updatedAt"
      FROM
        "AnimalFiles" af
      WHERE 
        af.animal_id = :id
    `;

    const animalFiles = await this.query(animalFilesQuery, "SELECT", {
      replacements,
    });

    return {
      ...animal,
      files: animalFiles,
    };
  }

  async findAllToTableView({ page, size, isPaginated }) {
    const animalQuery = `
      SELECT
        a.id,
        a.name,
        a.description,
        a.medical_information AS "medicalInformation",
        a.sex,
        a.birth_date AS "birthDate",
        at.title AS "type",
        asz.title AS "size",
        aag.title AS "ageGroup",
        ac.title AS "color",
        s.description as status
      FROM
        "Animals" a
      INNER JOIN "AnimalTypes" at ON at.id = a.type_id
      INNER JOIN "AnimalSizes" asz ON asz.id = a.size_id
      INNER JOIN "AnimalColors" ac ON ac.id = a.color_id
      INNER JOIN "AnimalAgeGroups" aag ON aag.id = a.age_group_id
      INNER JOIN "Statuses" s ON a.status_id = s.id
    `;

    const animals = await this.paginateSqlQuery(
      animalQuery,
      page,
      size,
      isPaginated
    );
    return animals;
  }

  async findAllToCardListView({ page, size, isPaginated, conditions }) {
    const columnsToFilter = {
      name: {
        value: "a.name",
        operation: "=",
      },
      types: {
        value: "at.title",
        operation: "IN",
      },
      sex: {
        value: "a.sex",
        operation: "IN",
      },
      states: {
        value: "ad.state",
        operation: "=",
      },
      sizes: {
        value: "asz.title",
        operation: "IN",
      },
      ageGroups: {
        value: "aag.title",
        operation: "IN",
      },
      colors: {
        value: "ac.title",
        operation: "IN",
      },
    };

    let filterCondition = this.formatWhereCondition(
      conditions,
      columnsToFilter
    );

    const animalQuery = `
      SELECT
        a.id,
        a.name,
        a.sex,
        at.title as type,
        a.birth_date as "birthDate",
        ad.city,
        ad.state
      FROM
        "Animals" a
      INNER JOIN "Organizations" o ON a.organization_id = o.id
      INNER JOIN "Addresses" ad ON o.id = ad.organization_id
      INNER JOIN "AnimalTypes" at ON a.type_id = at.id
      INNER JOIN "AnimalColors" ac ON a.color_id = ac.id
      INNER JOIN "AnimalAgeGroups" aag on a.age_group_id = aag.id
      INNER JOIN "AnimalSizes" asz on a.size_id = asz.id
      ${filterCondition.whereCondition}
    `;

    const animals = await this.paginateSqlQuery(
      animalQuery,
      page,
      size,
      isPaginated,
      filterCondition.replacements
    );

    return animals;
  }
}

export default new AnimalRepository();

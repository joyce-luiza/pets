import { Animal } from '../../database/models';
import AbstractRepository from '../abstract/AbstractRepository';

class AnimalRepository extends AbstractRepository {
  constructor() {
    super(Animal);
    this.getWithFilesById = this.getWithFilesById.bind(this);
    this.findActiveAnimalById = this.findActiveAnimalById.bind(this);
  }

  async findActiveAnimalById(id) {
    return await this.findOne({
      where: {
        id,
        statusId: await this.getActiveStatusId(),
      },
    });
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
        a.organization_id AS "organizationId",
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
      WHERE
        a.id = :id
    `;

    const [animal] = await this.query(animalQuery, 'SELECT', {
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

    const animalFiles = await this.query(animalFilesQuery, 'SELECT', {
      replacements,
    });

    return {
      ...animal,
      files: animalFiles,
    };
  }

  async findAllToTableView({
    page,
    size,
    isPaginated,
    search,
    typeFilter,
    sexFilter,
    sizeFilter,
    ageFilter,
    statusFilter,
  }) {
    let animalQuery = `
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
        a.organization_id AS "organizationId",
        s.description as status
      FROM
        "Animals" a
      INNER JOIN "AnimalTypes" at ON at.id = a.type_id
      INNER JOIN "AnimalSizes" asz ON asz.id = a.size_id
      INNER JOIN "AnimalColors" ac ON ac.id = a.color_id
      INNER JOIN "AnimalAgeGroups" aag ON aag.id = a.age_group_id
      INNER JOIN "Statuses" s ON a.status_id = s.id
    `;

    const replacements = {};

    // Adicionando o filtro de pesquisa, se fornecido
    if (search) {
      animalQuery += `WHERE a.name ILIKE :search `;
      replacements.search = `${search}%`;
    }

    if (typeFilter && typeFilter.length > 0) {
      animalQuery += ` AND at.title IN (:typeFilter)`;
      replacements.typeFilter = typeFilter;
    }
    if (sexFilter && sexFilter.length > 0) {
      animalQuery += ` AND a.sex IN (:sexFilter)`;
      replacements.sexFilter = sexFilter;
    }
    if (sizeFilter && sizeFilter.length > 0) {
      animalQuery += ` AND asz.title IN (:sizeFilter)`;
      replacements.sizeFilter = sizeFilter;
    }
    if (ageFilter && ageFilter.length > 0) {
      animalQuery += ` AND aag.title IN (:ageFilter)`;
      replacements.ageFilter = ageFilter;
    }
    if (statusFilter && statusFilter.length > 0) {
      animalQuery += ` AND s.description IN (:statusFilter)`;
      replacements.statusFilter = statusFilter;
    }

    const animals = await this.paginateSqlQuery(
      animalQuery,
      page,
      size,
      isPaginated,
      replacements
    );

    return animals;
  }
}

export default new AnimalRepository();

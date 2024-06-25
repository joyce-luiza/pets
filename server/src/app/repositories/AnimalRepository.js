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
        s.description AS "status",
        o.id AS "organizationId"
      FROM
        "Animals" a
      INNER JOIN "AnimalTypes" at ON at.id = a.type_id
      INNER JOIN "AnimalSizes" asz ON asz.id = a.size_id
      INNER JOIN "AnimalColors" ac ON ac.id = a.color_id
      INNER JOIN "AnimalAgeGroups" aag ON aag.id = a.age_group_id
      INNER JOIN "Statuses" s ON s.id = a.status_id
      INNER JOIN "Organizations" o ON a.organization_id = a.organization_id


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
    organizationId,
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
    if (organizationId) {
      animalQuery += `AND a.organization_id = :organizationId `;
      replacements.organizationId = `${organizationId}`;
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

  async findAllCardListView({ page, size, isPaginated, conditions }) {
    const columnsToFilter = {
      name: 'a.name',
      types: 'at.title',
      sizes: 'asz.title',
      sex: 'a.sex',
      ageGroups: 'aag.title',
      states: 'ad.state',
      colors: 'ac.title',
      status: 's.title',
    };

    const conditionss = {
      name: {
        value: conditions?.name || '',
        operation: 'LIKE',
      },
      types: {
        value: conditions?.types || '',
        operation: 'IN',
      },
      sizes: {
        value: conditions?.sizes || '',
        operation: 'IN',
      },
      sex: {
        value: conditions?.sex || '',
        operation: 'IN',
      },
      ageGroups: {
        value: conditions?.ageGroups || '',
        operation: 'IN',
      },
      states: {
        value: conditions?.states || '',
        operation: '=',
      },
      colors: {
        value: conditions?.colors || '',
        operation: 'IN',
      },
    };

    const { whereCondition, replacements } = await this.formatWhereCondition(
      conditionss,
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
      INNER JOIN "Statuses" s ON s.id = a.status_id AND s.id = '${await this.getActiveStatusId()}'
      ${whereCondition}
    `;

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

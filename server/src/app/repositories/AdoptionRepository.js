import { Adoption } from "../../database/models";
import AbstractRepository from "../abstract/AbstractRepository";

class AdoptionRepository extends AbstractRepository {
    constructor() {
        super(Adoption);
        this.createAdoption = this.createAdoption.bind(this);
        this.findAllToTableView = this.findAllToTableView.bind(this);
    }

    async createAdoption({ adopterId, animalId, notes }) {
        return await this.create({
            adopterId,
            animalId,
            notes,
            organizationReply: "",
            resultId: await this.getPendingResultId(),
            statusId: await this.getActiveStatusId(),
        });
    }

    async findActiveAdoptionById(id) {
        return await this.findOne({
            where: {
                id,
                statusId: await this.getActiveStatusId(),
            },
        });
    }

    async findAllToTableView({ page, size, isPaginated, conditions }) {
        const columnsToFilter = {
            organizationId: "an.organization_id",
        };

        const conditionsObj = {
            organizationId: {
                value: conditions?.organizationId || null,
                operation: "=",
            },
        };

        const { whereCondition, replacements } =
            await this.formatWhereCondition(conditionsObj, columnsToFilter);

        const adoptionQuery = `
        SELECT
            ad.id,
            an.name AS animalName,
            at.title AS "type",
            adop.id AS adopterId,
            adop.first_name AS adopterFirstName,
            adop.last_name AS adopterLastName,
            adop.email AS adopterEmail,
            r.title AS result,
            s.description AS status,
            ad.created_at AS "createdAt"
        FROM
            "Adoptions" ad
        INNER JOIN "Statuses" s ON ad.status_id = s.id
        INNER JOIN "Results" r ON ad.result_id = r.id
        INNER JOIN "Adopters" adop ON ad.adopter_id = adop.id
        INNER JOIN "Animals" an ON ad.animal_id = an.id
        INNER JOIN "AnimalTypes" at ON at.id = an.type_id
        ${whereCondition}
    `;

        const adoptions = await this.paginateSqlQuery(
            adoptionQuery,
            page,
            size,
            isPaginated,
            replacements
        );
        return adoptions;
    }
}

export default new AdoptionRepository();

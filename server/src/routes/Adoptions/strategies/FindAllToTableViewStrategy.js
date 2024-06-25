import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { AdoptionAdapter, Pagination } from "../../../app/domains/adapters";
import { Adoption } from "../../../app/domains";

/**
 * Strategy to list all adoptions in a table
 *
 * @extends AbstractStrategy
 */
export default class FindAllToTableViewStrategy extends AbstractStrategy {
    constructor(adoptionRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
    }

    /**
     * @param {Pagination} data - Pagination filter object
     */
    async execute(data, dto) {
        let result = [];

        const adoptions = await this.adoptionRepository.findAllToTableView(
            data
        );

        if (adoptions.length) {
            result = adoptions.map((adoption) => new AdoptionAdapter(adoption));
        }

        if ("data" in adoptions && adoptions.data.length) {
            result = {
                ...adoptions,
                data: adoptions.data.map(
                    (adoption) => new AdoptionAdapter(adoption)
                ),
            };
        }

        return result;
    }
}

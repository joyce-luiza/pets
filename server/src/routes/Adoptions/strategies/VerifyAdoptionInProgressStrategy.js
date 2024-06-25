import AbstractStrategy from "../../../app/abstract/AbstractStrategy";

/**
 * Strategy that checks whether there is adoption in progress
 *
 * @extends AbstractStrategy
 */
export default class VerifyAdoptionInProgressStrategy extends AbstractStrategy {
    constructor(adoptionRepository) {
        super();
        this.adoptionRepository = adoptionRepository;
    }

    /**
     * @param {String} id - Animal id
     */
    async execute({ id }, dto, loggedUserInfo) {
        // Get adoption by adopter ID and animal ID
        const adoption = await this.adoptionRepository.findOne({
            where: {
                adopterId: loggedUserInfo.userId,
                animalId: id,
                statusId: await this.adoptionRepository.getActiveStatusId(),
            },
        });

        if (adoption) {
            return true;
        } else {
            return false;
        }
    }
}

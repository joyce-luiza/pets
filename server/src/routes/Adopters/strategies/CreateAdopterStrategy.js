import AbstractRepository from '../../../app/abstract/AbstractRepository';
import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Adopter } from '../../../app/domains';

/**
 * Strategy to create an Adopter
 *
 * @extends AbstractStrategy
 */
export default class CreateAdopterStrategy extends AbstractStrategy {
	/**
	 * @param {AbstractRepository} repository - An instance of AbstractRepository
	 */
	constructor(repository) {
		super();
		this.repository = repository;
	}

	/**
	 * @param {Adopter} data - Adopter domain object
	 */
	async execute(data) {
		const adopter = await this.repository.createAdopter(data);

		if (!adopter) {
			this.throwError('Erro ao criar a conta');
		}

		const result = new Adopter(adopter);
		return result;
	}
}

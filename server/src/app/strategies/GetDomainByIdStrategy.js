import AbstractRepository from '../abstract/AbstractRepository';
import AbstractStrategy from '../abstract/AbstractStrategy';

export default class GetDomainByIdStrategy extends AbstractStrategy {
	/**
	 * @param {AbstractRepository} repository - An AbstractRepository instance.
	 */
	constructor(repository) {
		super();
		this.repository = repository;
	}

	async execute({ id }) {
		const instance = await this.repository.findById(id);

		if (!instance) {
			this.throwError(
				'Não foi possível recuperar dados a partir do id informado'
			);
		}

		return instance;
	}
}

import { Adopter } from '../../database/models';
import AbstractRepository from '../abstract/AbstractRepository';

class AdopterRepository extends AbstractRepository {
	constructor() {
		super(Adopter);
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
}

export default new AdopterRepository();

import AbstractFactory from '../../../app/abstract/AbstractFactory';
import { AdopterRepository } from '../../../app/repositories';
import {
	CreateAdopterStrategy,
	ValidateAdopterRequiredFieldsStrategy,
	ValidateAdopterAgeStrategy,
	ValidateEmailExistenceStrategy,
} from '../strategies';

class CreateAdopterFactory extends AbstractFactory {
	constructor() {
		super([
			new ValidateAdopterRequiredFieldsStrategy(),
			new ValidateAdopterAgeStrategy(),
			new ValidateEmailExistenceStrategy(AdopterRepository),
			new CreateAdopterStrategy(AdopterRepository),
		]);
	}
}

export default CreateAdopterFactory;

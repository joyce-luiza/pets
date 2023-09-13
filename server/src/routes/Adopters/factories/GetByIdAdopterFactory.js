import AbstractFactory from '../../../app/abstract/AbstractFactory';
import { AdopterRepository } from '../../../app/repositories';
import {
	GetDomainByIdStrategy,
	VerifyDomainIdParamStrategy,
} from '../../../app/strategies';
import { FormatToAdopterDomainStrategy } from '../strategies';

class GetByIdAdopterFactory extends AbstractFactory {
	constructor() {
		super([
			new VerifyDomainIdParamStrategy(),
			new GetDomainByIdStrategy(AdopterRepository),
			new FormatToAdopterDomainStrategy(),
		]);
	}
}

export default GetByIdAdopterFactory;

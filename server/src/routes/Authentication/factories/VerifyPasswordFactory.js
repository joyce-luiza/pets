import AbstractFactory from '../../../app/abstract/AbstractFactory';

import {
	AdopterRepository,
	OrganizationMemberRepository,
} from '../../../app/repositories';
import {
	ValidateRequiredFieldsToCompareCurrentUserPasswordStrategy,
	VerifyCurrentUserPasswordStrategy,
} from '../strategies';

class VerifyPasswordFactory extends AbstractFactory {
	constructor() {
		super([
			new ValidateRequiredFieldsToCompareCurrentUserPasswordStrategy(),
			new VerifyCurrentUserPasswordStrategy(
				AdopterRepository,
				OrganizationMemberRepository
			),
		]);
	}
}

export default VerifyPasswordFactory;

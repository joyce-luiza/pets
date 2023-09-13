import AbstractStrategy from '../abstract/AbstractStrategy';

export default class VerifyDomainIdParamStrategy extends AbstractStrategy {
	constructor() {
		super();
	}

	async execute({ id }) {
		if (!id) {
			this.throwError('ID não informado.', 400);
			return;
		}
	}
}

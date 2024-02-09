import { CustomError } from '../domains';

export default class AbstractFactory {
	constructor(strategies) {
		this.strategies = strategies;
		this.error = {};
	}

	async execute(data, dto, loggedUserInfo) {
		let result;
		for (const strategy of this.strategies) {
			if (result instanceof CustomError) {
				throw result;
			}
			result = await strategy.execute(data, dto, loggedUserInfo);
			dto = result ? result : dto;
		}

		return dto;
	}
}

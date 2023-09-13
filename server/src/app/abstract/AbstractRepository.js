import Status from '../../database/models/status';
import { STATUS } from '../constants';

export default class AbstractRepository {
	constructor(model) {
		this.model = model;
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	async getActiveStatusId() {
		return (await Status.findOne({ where: { code: STATUS.ACTIVE } })).id;
	}

	async getInactiveStatusId() {
		return (await Status.findOne({ where: { code: STATUS.INACTIVE } })).id;
	}

	async getSuspendedStatusId() {
		return (await Status.findOne({ where: { code: STATUS.SUSPENDED } })).id;
	}

	async create(data) {
		return await this.model.create(data);
	}

	async countGeneric(options) {
		return await this.model.count(options);
	}

	async findById(id) {
		return await this.model.findOne({ where: { id } });
	}

	// async findByUserId(userId) {
	//     const activeStatus = await this.getActiveStatusId();
	//     return await this.model.findOne({
	//         where: { userId, statusId: activeStatus },
	//     });
	// }
}

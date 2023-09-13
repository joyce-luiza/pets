import {
	CreateAdopterFactory,
	GetByIdAdopterFactory,
} from '../../routes/Adopters/factories';
import { Adopter } from '../domains';

export default class AdopterController {
	constructor() {
		this.create = this.create.bind(this);
		this.getById = this.getById.bind(this);
	}

	async create(req, res, next) {
		const adopter = new Adopter(req.body);
		const factory = new CreateAdopterFactory();
		const result = await factory.execute(adopter);
		res.json(result);
	}

	async getById(req, res, next) {
		const adopter = new Adopter({ id: req.params.id });
		const factory = new GetByIdAdopterFactory();
		const result = await factory.execute(adopter);
		res.json(result);
	}
}

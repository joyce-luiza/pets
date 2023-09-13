import onFinished from 'on-finished';
import cls from 'cls-hooked';
import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import database from '../config/database';

const namespace = cls.getNamespace('my-transaction-ns');

export default async (req, res, next) => {
	namespace.bindEmitter(req);
	namespace.bindEmitter(res);
	namespace.bind(next);
	namespace.run(async () => {
		const transaction = await new Sequelize(database).transaction();
		namespace.set('transaction', transaction);
		onFinished(res, (err) => {
			if (err || res.statusCode === 500 || res.statusCode === 400) {
				transaction.rollback();
			} else {
				transaction.commit();
			}
		});
		next();
	});
};

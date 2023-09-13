'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Adopters', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			first_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			last_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			birth_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone_number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Statuses',
					key: 'id',
					onUpdate: 'CASCADE',
					onDelete: 'SET NULL',
				},
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Adopters');
	},
};

"use strict";

const { RESULTS } = require("../../constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Results", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.ENUM(...Object.keys(RESULTS)),
                allowNull: false,
            },
            status_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Statuses",
                    key: "id",
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Results");
    },
};

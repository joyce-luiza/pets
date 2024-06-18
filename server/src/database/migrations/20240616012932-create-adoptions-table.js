"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Adoptions", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                autoIncrement: false,
                allowNull: false,
            },
            adopter_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Adopters",
                    key: "id",
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
            },
            animal_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Animals",
                    key: "id",
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
            },
            notes: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            result_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Results",
                    key: "id",
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
            },
            organization_reply: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Adoptions");
    },
};

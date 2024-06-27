"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("VisitAppointments", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
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
            organization_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Organizations",
                    key: "id",
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                },
            },
            appointment_date_time: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            notes: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            requester_id: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            approver_id: {
                allowNull: false,
                type: Sequelize.UUID,
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
        await queryInterface.dropTable("VisitAppointments");
    },
};

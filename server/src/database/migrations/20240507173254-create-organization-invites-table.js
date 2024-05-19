"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("OrganizationInvites", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                autoIncrement: false,
                allowNull: false,
            },
            invitedEmail: {
                field: "invited_email",
                type: Sequelize.STRING,
                allowNull: false,
            },
            token: {
                field: "token",
                type: Sequelize.STRING,
                allowNull: false,
            },
            organizationAdminId: {
                field: "organization_admin_id",
                type: Sequelize.UUID,
                allowNull: false,
            },
            organizationId: {
                field: "organization_id",
                type: Sequelize.UUID,
                allowNull: false,
            },
            statusId: {
                field: "status_id",
                type: Sequelize.UUID,
                allowNull: false,
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
        await queryInterface.dropTable("OrganizationInvites");
    },
};

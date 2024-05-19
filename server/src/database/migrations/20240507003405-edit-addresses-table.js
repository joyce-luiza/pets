"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Addresses", "organization_id", {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: "Organizations",
                key: "id",
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Addresses", "organization_id");
    },
};

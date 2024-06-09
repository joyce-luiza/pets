"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Animals", "organization_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Organizations",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
    await queryInterface.addColumn("Animals", "type_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "AnimalTypes",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
    await queryInterface.addColumn("Animals", "size_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "AnimalSizes",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
    await queryInterface.addColumn("Animals", "color_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "AnimalColors",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
    await queryInterface.addColumn("Animals", "age_group_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "AnimalAgeGroups",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
    await queryInterface.addColumn("Animals", "status_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Statuses",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Animals", "type_id");
    await queryInterface.removeColumn("Animals", "size_id");
    await queryInterface.removeColumn("Animals", "color_id");
    await queryInterface.removeColumn("Animals", "age_group_id");
    await queryInterface.removeColumn("Animals", "status_id");
  },
};

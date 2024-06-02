"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("AnimalFiles", "animal_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Animals",
        key: "id",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("AnimalFiles", "animal_id");
  },
};

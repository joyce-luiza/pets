"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AdopterAnimalColorPreferences", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      adopter_preference_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "AdopterPreferences",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      animal_color_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "AnimalColors",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
    await queryInterface.dropTable("AdopterAnimalColorPreferences");
  },
};

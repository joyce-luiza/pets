"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Addresses", "complement", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Addresses", "cep", {
      type: Sequelize.STRING(8),
      allowNull: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Addresses", "complement");
    await queryInterface.changeColumn("Addresses", "cep", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};

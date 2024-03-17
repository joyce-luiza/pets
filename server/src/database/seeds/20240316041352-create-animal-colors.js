"use strict";

const uuid = require("uuid");
const { ANIMAL_COLORS, STATUS } = require("../../constants");
const { sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const animalColors = Object.keys(ANIMAL_COLORS);

    const query = `SELECT "id" FROM "Statuses" s WHERE s.code = '${STATUS.ACTIVE}'`;
    const [status] = await queryInterface.sequelize.query(query);

    const animalColorObjects = animalColors.map((color) => {
      return {
        id: uuid.v4(),
        title: color,
        status_id: status[0].id,
      };
    });

    await queryInterface.bulkInsert("AnimalColors", animalColorObjects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AnimalColors", [], {});
  },
};

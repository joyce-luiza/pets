"use strict";

const uuid = require("uuid");
const { ANIMAL_SIZES, STATUS } = require("../../constants");
const { sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const animalSizes = Object.keys(ANIMAL_SIZES);

    const query = `SELECT "id" FROM "Statuses" s WHERE s.code = '${STATUS.ACTIVE}'`;
    const [status] = await queryInterface.sequelize.query(query);

    const animalSizeObjects = animalSizes.map((size) => {
      return {
        id: uuid.v4(),
        title: size,
        status_id: status[0].id,
      };
    });

    await queryInterface.bulkInsert("AnimalSizes", animalSizeObjects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AnimalSizes", [], {});
  },
};

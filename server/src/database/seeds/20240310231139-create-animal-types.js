"use strict";

const uuid = require("uuid");
const { ANIMAL_TYPES, STATUS } = require("../../constants");
const { sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const animalTypes = Object.keys(ANIMAL_TYPES);

    const query = `SELECT "id" FROM "Statuses" s WHERE s.code = '${STATUS.ACTIVE}'`;
    const [status] = await queryInterface.sequelize.query(query);

    const animalTypeObjects = animalTypes.map((type) => {
      return {
        id: uuid.v4(),
        title: type,
        status_id: status[0].id,
      };
    });

    await queryInterface.bulkInsert("AnimalTypes", animalTypeObjects, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AnimalTypes", [], {});
  },
};

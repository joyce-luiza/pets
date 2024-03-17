"use strict";

const uuid = require("uuid");
const { ANIMAL_AGE_GROUPS, STATUS } = require("../../constants");
const { sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const animalAgeGroups = Object.keys(ANIMAL_AGE_GROUPS);

    const query = `SELECT "id" FROM "Statuses" s WHERE s.code = '${STATUS.ACTIVE}'`;
    const [status] = await queryInterface.sequelize.query(query);

    const animalAgeGroupObjects = animalAgeGroups.map((type) => {
      return {
        id: uuid.v4(),
        title: type,
        status_id: status[0].id,
      };
    });

    await queryInterface.bulkInsert(
      "AnimalAgeGroups",
      animalAgeGroupObjects,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AnimalAgeGroups", [], {});
  },
};

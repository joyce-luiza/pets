"use strict";
const uuid = require("uuid");
const { RESULTS, STATUS } = require("../../constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const results = Object.keys(RESULTS);

        const query = `SELECT "id" FROM "Statuses" s WHERE s.code = '${STATUS.ACTIVE}'`;
        const [status] = await queryInterface.sequelize.query(query);

        const resultsObjects = results.map((result) => {
            return {
                id: uuid.v4(),
                title: result,
                status_id: status[0].id,
            };
        });

        await queryInterface.bulkInsert("Results", resultsObjects, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Results", [], {});
    },
};

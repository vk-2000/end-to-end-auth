/* eslint-disable no-unused-vars */
'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
        queryInterface.bulkInsert('Users', [
            {username: 'abc123', password: await bcrypt.hashSync('password', 10)},
            {username: 'xyz123', password: await bcrypt.hashSync('password', 10)},
        ], {});
    },

    async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
        queryInterface.bulkDelete('Users', null, {});
    }
};

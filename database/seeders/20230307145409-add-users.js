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
            {email: 'abc@gmail.com', password: await bcrypt.hashSync('password', 10)},
            {email: 'xyz@gmail.com', password: await bcrypt.hashSync('password', 10)},
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

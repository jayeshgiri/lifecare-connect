'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tenants', [
      {
        uuid: 'e7f7bca5-b6f1-4f3b-a49a-17d68548df23', // Fixed UUID for consistency
        name: 'LifeCare Pharmacy',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tenants', {
      name: 'LifeCare Pharmacy',
    });
  },
};
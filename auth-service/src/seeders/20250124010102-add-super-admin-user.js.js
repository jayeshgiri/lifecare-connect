'use strict';
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

module.exports = {
  async up(queryInterface) {
    // Fetch the UUID of the "Super Admin" role
    const superAdminRole = await queryInterface.sequelize.query(
      `SELECT uuid FROM "Roles" WHERE name = 'Super Admin';`
    );

    // If the Super Admin role is not found, throw an error
    if (!superAdminRole[0].length) {
      throw new Error('Super Admin role not found. Make sure the Roles table is seeded.');
    }

    const superAdminRoleUuid = superAdminRole[0][0].uuid;

    // Hash the provided password
    const hashedPassword = await bcrypt.hash('Pass123$', 10);

    // Insert the Super Admin user
    await queryInterface.bulkInsert('Users', [
      {
        uuid: uuidv4(), // Dynamically generate a valid UUID
        firstname: 'Jayesh',
        lastname: 'Goswami',
        emailaddress: 'goswamijayeshb@gmail.com',
        phonenumber: '8866272249',
        password: hashedPassword, // Store the hashed password
        roleUuid: superAdminRoleUuid, // Assign the Super Admin role
        createdAt: new Date(), // Set the creation timestamp
        updatedAt: new Date(), // Set the update timestamp
      },
    ]);
  },

  async down(queryInterface) {
    // Remove the inserted user during a rollback
    await queryInterface.bulkDelete('Users', { emailaddress: 'goswamijayeshb@gmail.com' });
  },
};
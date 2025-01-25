'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      roleUuid: {
        type: Sequelize.UUID,
        allowNull: false, // Ensures a Role is always specified
        references: {
          model: 'Roles', // Name of the Roles table
          key: 'uuid', // UUID column in the Roles table
        },
        onUpdate: 'CASCADE', // Update roleUuid in RolePermissions if the UUID in Roles changes
        onDelete: 'CASCADE', // Delete RolePermissions if the associated Role is deleted
      },
      permissionUuid: {
        type: Sequelize.UUID,
        allowNull: false, // Ensures a Permission is always specified
        references: {
          model: 'Permissions', // Name of the Permissions table
          key: 'uuid', // UUID column in the Permissions table
        },
        onUpdate: 'CASCADE', // Update permissionUuid in RolePermissions if the UUID in Permissions changes
        onDelete: 'CASCADE', // Delete RolePermissions if the associated Permission is deleted
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, // Automatically tracks when the record is created
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE, // Automatically tracks when the record is updated
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the RolePermissions table on rollback
    await queryInterface.dropTable('RolePermissions');
  },
};
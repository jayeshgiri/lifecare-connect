'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserPermissions', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Table name for Users
          key: 'uuid', // Primary key in Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permissionUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Permissions', // Table name for Permissions
          key: 'uuid', // Primary key in Permissions table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      allow: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indicates whether the permission is granted (true) or denied (false)',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserPermissions');
  },
};
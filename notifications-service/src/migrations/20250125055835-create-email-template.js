'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EmailTemplates', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tenantUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'en',
        comment: 'Language/locale of the template (e.g., en, fr, es)',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Unique name for the template (e.g., welcome_email)',
      },
      subjectTemplate: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Subject template for email notifications',
      },
      bodyTemplate: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'HTML body template with placeholders (e.g., {{name}})',
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: 'Version number for template versioning',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indicates whether the template is active or not',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'Timestamp for soft deletion',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('EmailTemplates');
  },
};
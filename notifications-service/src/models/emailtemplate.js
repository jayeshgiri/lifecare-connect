'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class EmailTemplate extends Model {
    static associate(models) {
      
    }
  }

  EmailTemplate.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenantUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      locale: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en',
        comment: 'Language/locale of the template (e.g., en, fr, es)',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Unique name for the template (e.g., welcome_email)',
      },
      subjectTemplate: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Subject template for email notifications',
      },
      bodyTemplate: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'HTML body template with placeholders (e.g., {{name}})',
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: 'Version number for template versioning',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indicates whether the template is active or not',
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp for soft deletion',
      },
    },
    {
      sequelize,
      modelName: 'EmailTemplate',
      timestamps: true, // Automatically add createdAt and updatedAt
      paranoid: true, // Enables soft deletes
    }
  );

  return EmailTemplate;
};

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Tenant extends Model {
    static associate(models) {
      // A tenant can have many email templates
      Tenant.hasMany(models.EmailTemplate, {
        foreignKey: 'tenantUuid',
        as: 'emailTemplates',
      });
    }
  }

  Tenant.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Name of the tenant (e.g., MyApp Inc.)',
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indicates if the tenant is active or suspended',
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp for soft deletion',
      },
    },
    {
      sequelize,
      modelName: 'Tenant',
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  return Tenant;
};
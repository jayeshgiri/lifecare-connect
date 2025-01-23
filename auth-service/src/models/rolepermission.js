'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A RolePermission belongs to a Role
      RolePermission.belongsTo(models.Role, {
        foreignKey: 'roleUuid',
        as: 'role',
      });

      // A RolePermission belongs to a Permission
      RolePermission.belongsTo(models.Permission, {
        foreignKey: 'permissionUuid',
        as: 'permission',
      });
    }
  }

  RolePermission.init(
    {
      roleUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Roles', // Name of the Roles table
          key: 'uuid', // UUID column in Roles
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permissionUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Permissions', // Name of the Permissions table
          key: 'uuid', // UUID column in Permissions
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'RolePermission',
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  return RolePermission;
};
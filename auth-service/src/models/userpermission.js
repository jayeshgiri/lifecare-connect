'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A UserPermission belongs to a User
      UserPermission.belongsTo(models.User, {
        foreignKey: 'userUuid',
        as: 'user',
      });

      // A UserPermission belongs to a Permission
      UserPermission.belongsTo(models.Permission, {
        foreignKey: 'permissionUuid',
        as: 'permission',
      });
    }
  }

  UserPermission.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Table name for Users
          key: 'uuid', // UUID column in Users table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permissionUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Permissions', // Table name for Permissions
          key: 'uuid', // UUID column in Permissions table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      allow: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to granting the permission
        comment: 'Indicates whether the permission is granted (true) or denied (false)',
      },
    },
    {
      sequelize,
      modelName: 'UserPermission',
      timestamps: true, // Automatically manage createdAt and updatedAt
    }
  );

  return UserPermission;
};
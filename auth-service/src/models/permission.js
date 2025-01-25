'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Permission can be granted to multiple users via UserPermissions
      Permission.hasMany(models.UserPermission, {
        foreignKey: 'permissionUuid',
        as: 'userPermissions',
      });

      // A Permission can belong to multiple roles via RolePermissions
      Permission.belongsToMany(models.Role, {
        through: models.RolePermission, // RolePermission table for many-to-many relationship
        foreignKey: 'permissionUuid',
        otherKey: 'roleUuid',
        as: 'roles',
      });
    }
  }

  Permission.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure permission names are unique
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true, // Optional description of the permission
      },
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );

  return Permission;
};
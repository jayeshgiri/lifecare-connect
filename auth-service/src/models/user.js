'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A user belongs to a role
      User.belongsTo(models.Role, {
        foreignKey: 'roleUuid',
        as: 'role',
      });

      // A user can have custom permissions
      User.hasMany(models.UserPermission, {
        foreignKey: 'userUuid',
        as: 'userPermissions',
      });
    }
  }

  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailaddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
          isEmail: true, // Validate email format
        },
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleUuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Roles', // Table name for Roles
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      status: {
        type: DataTypes.BOOLEAN, // true = active, false = suspended
        allowNull: false,
        defaultValue: true,
        comment: 'Indicates whether the user account is active or suspended',
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp for soft deletion',
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true, // Automatically add createdAt and updatedAt
      paranoid: true, // Enables soft deletes (uses deletedAt)
    }
  );

  return User;
};
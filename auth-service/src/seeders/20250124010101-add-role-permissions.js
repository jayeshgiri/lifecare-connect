'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const roles = await queryInterface.sequelize.query('SELECT uuid, name FROM "Roles";');
    const permissions = await queryInterface.sequelize.query('SELECT uuid, name FROM "Permissions";');

    const roleMap = {};
    const permissionMap = {};

    roles[0].forEach((role) => {
      roleMap[role.name] = role.uuid;
    });

    permissions[0].forEach((permission) => {
      permissionMap[permission.name] = permission.uuid;
    });

    const rolePermissions = [
      // Super Admin Permissions (Full Access)
      ...Object.values(permissionMap).map((permissionUuid) => ({
        roleUuid: roleMap['Super Admin'],
        permissionUuid,
      })),

      // Store Admin Permissions
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['view_inventory'] },
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['add_inventory'] },
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['edit_inventory'] },
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['delete_inventory'] },
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['view_stock'] },
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['adjust_stock'] },
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['view_store_settings'] },
      { roleUuid: roleMap['Store Admin'], permissionUuid: permissionMap['edit_store_settings'] },


      // Pharmacist Permissions
      { roleUuid: roleMap['Pharmacist'], permissionUuid: permissionMap['process_prescriptions'] },
      { roleUuid: roleMap['Pharmacist'], permissionUuid: permissionMap['track_expiry_dates'] },
      { roleUuid: roleMap['Pharmacist'], permissionUuid: permissionMap['track_batch_numbers'] },

      // Cashier Permissions
      { roleUuid: roleMap['Cashier'], permissionUuid: permissionMap['handle_transactions'] },
      { roleUuid: roleMap['Cashier'], permissionUuid: permissionMap['report_cash_flow'] },

      // Delivery Personnel Permissions
      { roleUuid: roleMap['Delivery Personnel'], permissionUuid: permissionMap['track_deliveries'] },
      { roleUuid: roleMap['Delivery Personnel'], permissionUuid: permissionMap['update_delivery_status'] },

      // Staff Member Permissions
      { roleUuid: roleMap['Staff Member'], permissionUuid: permissionMap['restock_inventory'] },
      { roleUuid: roleMap['Staff Member'], permissionUuid: permissionMap['assist_customers'] },

      // Customer Permissions
      { roleUuid: roleMap['Customer'], permissionUuid: permissionMap['browse_medicines'] },
      { roleUuid: roleMap['Customer'], permissionUuid: permissionMap['track_orders'] },
    ];

    const rolePermissionsWithMeta = rolePermissions.map((rp) => ({
      uuid: uuidv4(),
      roleUuid: rp.roleUuid,
      permissionUuid: rp.permissionUuid,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('RolePermissions', rolePermissionsWithMeta);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('RolePermissions', null, {});
  },
};
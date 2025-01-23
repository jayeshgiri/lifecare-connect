'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    // Insert Roles
    const roles = [
      { uuid: uuidv4(), name: 'Super Admin', description: 'Manage all tenants and application settings', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'Store Admin', description: 'Manage store-specific settings and staff', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'Store Manager', description: 'Manage store inventory and staff', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'Pharmacist', description: 'Handle prescriptions and dispense medicines', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'Cashier', description: 'Handle billing and transactions', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'Delivery Personnel', description: 'Manage and track deliveries', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'Staff Member', description: 'Assist pharmacists and store managers', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'Customer', description: 'Browse and purchase medicines online', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('Roles', roles);

    // Map role UUIDs for use in permissions
    const roleMap = {};
    const roleRows = await queryInterface.sequelize.query('SELECT uuid, name FROM "Roles";');
    roleRows[0].forEach((role) => {
      roleMap[role.name] = role.uuid;
    });

    // Insert Permissions
    const permissions = [
      // Inventory Permissions
      { uuid: uuidv4(), name: 'view_inventory', description: 'View all inventory items', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'add_inventory', description: 'Add new inventory items', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'edit_inventory', description: 'Edit inventory items', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'delete_inventory', description: 'Delete inventory items', createdAt: new Date(), updatedAt: new Date() },

      // Stock Permissions
      { uuid: uuidv4(), name: 'view_stock', description: 'View stock levels for a specific location', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'adjust_stock', description: 'Adjust stock levels for corrections', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'reorder_stock', description: 'Reorder stock for low inventory', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'track_stock_movements', description: 'Track stock movements between locations', createdAt: new Date(), updatedAt: new Date() },

      // Store Permissions
      { uuid: uuidv4(), name: 'view_stores', description: 'View stores', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'add_store', description: 'Add a new store', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'edit_store', description: 'Edit store details', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'delete_store', description: 'Delete a store', createdAt: new Date(), updatedAt: new Date() },

      // Pharmacist Permissions
      { uuid: uuidv4(), name: 'process_prescriptions', description: 'Process prescriptions', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'track_expiry_dates', description: 'Track medicine expiry dates', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'track_batch_numbers', description: 'Track batch numbers of medicines', createdAt: new Date(), updatedAt: new Date() },

      // Cashier Permissions
      { uuid: uuidv4(), name: 'handle_transactions', description: 'Handle transactions at the counter', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'report_cash_flow', description: 'Generate daily cash flow reports', createdAt: new Date(), updatedAt: new Date() },

      // Delivery Personnel Permissions
      { uuid: uuidv4(), name: 'track_deliveries', description: 'Track delivery status of orders', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'update_delivery_status', description: 'Update delivery status', createdAt: new Date(), updatedAt: new Date() },

      // Staff Member Permissions
      { uuid: uuidv4(), name: 'restock_inventory', description: 'Restock inventory shelves', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'assist_customers', description: 'Assist customers with inquiries', createdAt: new Date(), updatedAt: new Date() },

      // Customer Permissions
      { uuid: uuidv4(), name: 'browse_medicines', description: 'Browse available medicines online', createdAt: new Date(), updatedAt: new Date() },
      { uuid: uuidv4(), name: 'track_orders', description: 'Track order and delivery status', createdAt: new Date(), updatedAt: new Date() },
    
       // Global Settings Permissions
       { uuid: uuidv4(), name: 'view_global_settings', description: 'View global application settings', createdAt: new Date(), updatedAt: new Date() },
       { uuid: uuidv4(), name: 'edit_global_settings', description: 'Edit global application settings', createdAt: new Date(), updatedAt: new Date() },
       { uuid: uuidv4(), name: 'manage_subscription_plans', description: 'Manage subscription plans for tenants', createdAt: new Date(), updatedAt: new Date() },
       { uuid: uuidv4(), name: 'generate_global_reports', description: 'Generate reports across the entire application', createdAt: new Date(), updatedAt: new Date() },
 
       // Store-Specific Settings Permissions
       { uuid: uuidv4(), name: 'view_store_settings', description: 'View settings for a specific store', createdAt: new Date(), updatedAt: new Date() },
       { uuid: uuidv4(), name: 'edit_store_settings', description: 'Edit settings for a specific store', createdAt: new Date(), updatedAt: new Date() }, 
    
    ];
    await queryInterface.bulkInsert('Permissions', permissions);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Permissions', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
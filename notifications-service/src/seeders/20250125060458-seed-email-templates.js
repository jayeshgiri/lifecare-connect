'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('EmailTemplates', [
      {
        uuid: '3b961d3a-8a7a-4a3a-bb87-2f2e3b8e3d45', // Fixed UUID for consistency
        tenantUuid: 'e7f7bca5-b6f1-4f3b-a49a-17d68548df23', // UUID of LifeCare Pharmacy
        locale: 'en',
        name: 'welcome_email',
        subjectTemplate: 'Welcome to LifeCare Pharmacy, {{name}}!',
        bodyTemplate: `
          <!DOCTYPE html>
          <html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #f4f4f4;
                  }
                  .email-container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border: 1px solid #dddddd;
                      border-radius: 8px;
                      overflow: hidden;
                  }
                  .header {
                      background-color: #007bff;
                      color: #ffffff;
                      text-align: center;
                      padding: 20px;
                  }
                  .header h1 {
                      margin: 0;
                      font-size: 24px;
                  }
                  .body {
                      padding: 20px;
                  }
                  .body h1 {
                      font-size: 20px;
                      color: #333333;
                  }
                  .body p {
                      font-size: 16px;
                      line-height: 1.6;
                      color: #555555;
                  }
                  .footer {
                      background-color: #f4f4f4;
                      text-align: center;
                      padding: 10px;
                      font-size: 14px;
                      color: #888888;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <!-- Header -->
                  <div class="header">
                      <h1>LifeCare Pharmacy</h1>
                  </div>

                  <!-- Body -->
                  <div class="body">
                      <h1>Welcome, {{name}}!</h1>
                      <p>Thank you for joining LifeCare Pharmacy. We're excited to serve you and provide the best care for your health needs.</p>
                      <p>Feel free to explore our services and contact us if you need any assistance.</p>
                  </div>

                  <!-- Footer -->
                  <div class="footer">
                      <p>&copy; 2025 LifeCare Pharmacy. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>
        `,
        version: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('EmailTemplates', {
      name: 'welcome_email',
    });
  },
};
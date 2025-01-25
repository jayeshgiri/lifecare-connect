const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const {
    appConfiguration: { apiVersion, serverPort },
  } = require('./config');
const { sequelize } = require('./models');
const routes = require('./routes');
const {
    loggerUtilities: { logError, logInfo },
  } = require('./utils');

const MODULE_NAME = path.basename(__filename);

/**
 * Configures and sets up middleware for the Express application.
 * This includes JSON parsing, URL-encoded body parsing, security headers, CORS, and file upload handling.
 * @param {express.Application} app - The Express application instance.
 */
const setupMiddlewares = (app) => {
    // Trust the first proxy for reverse proxy/load balancer support
    app.set('trust proxy', 1);
  
    // Enable Cross-Origin Resource Sharing (CORS)
    app.use(cors());
  
    // Middleware to parse incoming requests with JSON payloads
    app.use(express.json());
  
    // Middleware to parse URL-encoded payloads with large size limit and extended parameters
    app.use(express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));
    
    // Disable the 'X-Powered-By' header for added security
    app.disable('x-powered-by');
  };


/**
 * Initializes the database connection and logs the connection status.
 */
const initializeDatabaseConnection = async () => {
    const FUNCTION_NAME = 'initializeDatabaseConnection';
  
    try {
      await sequelize.authenticate();
  
      logInfo({
        name: 'Database Connection',
        message: 'Database connected successfully.',
        moduleName: MODULE_NAME,
        functionName: FUNCTION_NAME,
      });
    } catch (error) {
      logError({ error, moduleName: MODULE_NAME, functionName: FUNCTION_NAME });
  
      throw error;
    }
  };
  
  /**
 * Initializes and starts the Express server. This function configures middleware, sets up routes,
 * connects to the database, and handles error scenarios.
 */
const initializeServer = async () => {
    const FUNCTION_NAME = 'initializeServer';
  
    try {
      // Create a new Express application instance
      const app = express();
  
      // Configure middlewares for the application
      setupMiddlewares(app);
  
      // Register the routes for the application
      app.use(apiVersion, routes);
  
      // Initialize database connection
      await initializeDatabaseConnection();
  
      // Start the server and listen on the configured port
      app.listen(serverPort, () => {
        logInfo({
          name: 'Server Startup',
          message: `Server is running on port ${serverPort}.`,
          moduleName: MODULE_NAME,
          functionName: FUNCTION_NAME,
        });
      });
  
    } catch (error) {
      // Log error and terminate the process if the server fails to start
      logError({ error, moduleName: MODULE_NAME, functionName: FUNCTION_NAME });
  
      // Exit the process with a failure code (non-zero status)
      process.exit(1);
    }
  };
  
  // Start the server by calling the initialization function
  initializeServer();
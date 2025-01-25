const Joi = require('joi');
const dotenv = require('dotenv');
const { get, includes, reduce } = require('lodash');

// Load environment variables from .env file
dotenv.config();

/**
 * List of allowed application environments.
 * These specify the permissible `NODE_ENV` values.
 */
const ALLOWED_ENVIRONMENTS = ['development', 'qa', 'demo', 'production'];

/**
 * Environments where SSL is required for database connections.
 */
const SSL_ENABLED_ENVIRONMENTS = ['demo', 'production'];


/**
 * Joi schema to validate the required environment variables.
 * This ensures all necessary variables are set and follow the expected format.
 */
const envSchema = Joi.object({
    DB_NAME: Joi.string().required().description('Database name'),
    DB_HOST: Joi.string().required().description('Database host'),
    DB_PASSWORD: Joi.string().required().description('Database password'),
    DB_PORT: Joi.number().required().description('Database port'),
    DB_USERNAME: Joi.string().required().description('Database username'),
    NODE_ENV: Joi.string()
      .valid(...ALLOWED_ENVIRONMENTS)
      .default('development')
      .description('Application environment'),
    PORT: Joi.number().default(3000).description('Application server port'),
    SENDGRID_API_KEY: Joi.string().required().description('SENDGRID_API_KEY')
  }).unknown(); // Allow additional properties (e.g., system-specific ENV variables).
  
// Validate environment variables against the schema
const { value: envVars, error: validationError } = envSchema.validate(process.env, {
    errors: { label: 'key' },
});
  

// Throw an error if validation fails, detailing the invalid fields
if (validationError) {
    const errorMessage = reduce(
    get(validationError, 'details'),
    (acc, { message }) => `${acc}, ${message.replace(/"/g, '')}`,
    '',
    ).slice(2); // Remove the leading comma and space
    throw new Error(`Configuration validation error: ${errorMessage}`);
}

/**
 * Build the application configuration object.
 * This object includes validated environment variables and other settings.
 */
const config = {
    allowedEnvironments: ALLOWED_ENVIRONMENTS,
    apiVersion: '/api/v1',
    db: {
      database: get(envVars, 'DB_NAME'),
      dialect: 'postgres',
      host: get(envVars, 'DB_HOST'),
      password: get(envVars, 'DB_PASSWORD'),
      port: get(envVars, 'DB_PORT'),
      username: get(envVars, 'DB_USERNAME'),
      dialectOptions: includes(SSL_ENABLED_ENVIRONMENTS, get(envVars, 'NODE_ENV'))
        ? {
            ssl: {
              require: true, // Enforce SSL for secure database connections
              rejectUnauthorized: false, // Allow self-signed certificates if necessary
            },
          }
        : {}, // No special options for non-SSL environments
    },
    nodeEnv: get(envVars, 'NODE_ENV'),
    serverPort: get(envVars, 'PORT')
  };
  
  module.exports = config;
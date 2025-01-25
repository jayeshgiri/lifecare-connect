const { reduce } = require('lodash');
const { allowedEnvironments, db } = require('./app');

/**
 * Creates a configuration object where each environment is mapped
 * to the corresponding database configuration.
 */
const dbConfiguration = reduce(
  allowedEnvironments,
  (environmentConfigs, environment) => {
    // Assign the db configuration to each environment
    environmentConfigs[environment] = db;

    return environmentConfigs;
  },
  {},
);

module.exports = dbConfiguration;
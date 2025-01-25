const { get, isEqual, isString } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { createLogger, format, transports } = require('winston');
const {
  appConfiguration: { nodeEnv },
} = require('../config');

// Define a log format for console output (readable for development)
const consoleLogFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf(({ timestamp, level, logDetails }) => {
    let logMessage = get(logDetails, 'message');

    logMessage = isString(logMessage) ? logMessage : JSON.stringify(logMessage);

    return `${timestamp} ${level}: ${logMessage}`;
  }),
);

// Configure the Winston logger
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    // Write error-level logs to a file
    new transports.File({ filename: 'src/logs/error.log', level: 'error' }),
    // Add console transport for non-production environments
    ...(!isEqual(nodeEnv, 'production')
      ? [new transports.Console({ format: format.combine(format.colorize(), consoleLogFormat) })]
      : []),
  ],
});

/**
 * Logs an error message with contextual details.
 * @param {Object} params - Parameters for logging the error.
 * @param {Error} params.error - The error object to log.
 * @param {string} [params.moduleName=''] - The name of the module where the error occurred.
 * @param {string} [params.functionName=''] - The name of the function where the error occurred.
 */
const logError = (params) => {
  const { error, moduleName = '', functionName = '' } = params;

  const errorId = uuidv4();

  let errorMessage = get(error, 'message', 'An error occurred');

  errorMessage = isString(errorMessage) ? errorMessage : JSON.stringify(errorMessage);

  const fullError = isString(error)
    ? error
    : JSON.stringify({
        message: get(error, 'message'),
        stack: get(error, 'stack'),
      });

  logger.log({
    id: errorId,
    level: 'error',
    logDetails: {
      occurredAt: new Date(),
      name: get(error, 'name', 'Unknown Error'),
      message: errorMessage,
      fullError,
      moduleName,
      functionName,
    },
  });
};

/**
 * Logs an informational message with contextual details.
 * @param {Object} params - Parameters for logging the information.
 * @param {string} params.name - A name to associate with the log (e.g., event or operation name).
 * @param {string} params.message - The informational message to log.
 * @param {string} [params.moduleName=''] - The name of the module where the log originated.
 * @param {string} [params.functionName=''] - The name of the function where the log originated.
 */
const logInfo = (params) => {
  const { name, message, moduleName = '', functionName = '' } = params;

  const infoId = uuidv4();

  logger.log({
    id: infoId,
    level: 'info',
    logDetails: {
      occurredAt: new Date(),
      name,
      message,
      moduleName,
      functionName,
    },
  });
};

module.exports = { logError, logInfo };

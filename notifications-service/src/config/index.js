const appConfiguration = require('./app');
const dbConfiguration = require('./database');
const sgMail = require('./sendgrid');

module.exports = { appConfiguration, dbConfiguration, sgMail };
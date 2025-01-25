const {sendEmail} = require('./email_service');
const {renderTemplate} = require('./template_service');

module.exports = { sendEmail, renderTemplate };
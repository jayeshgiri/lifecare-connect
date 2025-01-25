const { EmailTemplate } = require('../models');
const handlebars = require('handlebars');

const renderTemplate = async (tenantUuid, locale, templateName, data) => {
  const template = await EmailTemplate.findOne({
    where: { tenantUuid, locale, name: templateName, isActive: true },
  });

  if (!template) {
    throw new Error(`Template "${templateName}" not found for tenant ${tenantUuid}`);
  }

  const compiledSubject = handlebars.compile(template.subjectTemplate);
  const compiledBody = handlebars.compile(template.bodyTemplate);

  return {
    subject: compiledSubject(data),
    body: compiledBody(data),
  };
};

module.exports = { renderTemplate };
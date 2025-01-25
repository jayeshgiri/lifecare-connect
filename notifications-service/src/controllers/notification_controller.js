const { renderTemplate, sendEmail } = require('../services');

const sendNotification = async (req, res) => {
  const { tenantUuid, locale, templateName, recipient, data } = req.body;

  try {
    const { subject, body } = await renderTemplate(tenantUuid, locale, templateName, data);
    await sendEmail(recipient, subject, body);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendNotification };
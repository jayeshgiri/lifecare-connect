const {sgMail} = require('../config');

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: 'goswamijayeshb@gmail.com', // Replace with your verified sender email
      subject,
      html,
    };
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.log("test");
    console.error('Error sending email:', error.response?.body || error.message);
    throw error;
  }
};

module.exports = { sendEmail };
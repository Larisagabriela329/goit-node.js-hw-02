require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'larisagabriela329@outlook.com',
  from: 'larisagabriela329@outlook.com',  // must match what's verified in SendGrid
  subject: 'Test Email from Node.js',
  text: 'This is a test email.',
  html: '<strong>This is a test email.</strong>',
};

sgMail.send(msg)
  .then(() => console.log('Test email sent'))
  .catch(error => {
    console.error('Error sending test email:', error);
    if (error.response) {
      console.error('Response body:', error.response.body);
    }
  });

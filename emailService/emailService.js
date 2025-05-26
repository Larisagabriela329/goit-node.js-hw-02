const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: 'larisagabriela329@outlook.com', 
    subject: 'Verify your email',
    html: `<a href="${process.env.BASE_URL}/auth/verify/${verificationToken}">Click here to verify your email</a>`,
  };

  await sgMail.send(msg);
};

module.exports = { sendVerificationEmail };


const User = require("../models/user"); 
const { sendVerificationEmail } = require("../emailService/emailService");
const Joi = require("joi");

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required field email" });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    await sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    next(err);
  }
};

module.exports = resendVerifyEmail;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_BREVO_USER,
    pass: process.env.SMTP_BREVO_SECRET,
  },
});

export default transporter;

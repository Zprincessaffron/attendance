import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Nodemailer transport setup for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',  // Using Gmail's service
  auth: {
    user: process.env.EMAIL,  // Your email address
    pass: process.env.PASSWORD,  // Your app-specific password or Gmail password
  },
});

// Helper function to send email
const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export default sendEmail;

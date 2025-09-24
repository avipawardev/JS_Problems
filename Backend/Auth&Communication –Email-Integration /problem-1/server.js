require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Create transporter for Gmail
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Email sending route
app.get('/sendemail', async (req, res) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: [process.env.EMAIL_USER || 'your-email@gmail.com', 'venugopal.burli@masaischool.com'],
            subject: 'Testing Mail from NEM Student',
            text: 'This is a testing Mail sent by NEM student, no need to reply.'
        };

        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000")
})
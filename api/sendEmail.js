// api/sendEmail.js
const nodemailer = require('nodemailer');

// Load environment variables
const smtpUser = process.env.SMTP_USER; // 'your_email@gmail.com'
const smtpPass = process.env.SMTP_PASS; // 'your_email_password_or_app_password'

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { Name, Email, PhoneNumber, Message } = req.body;

    if (!Name || !Email || !PhoneNumber || !Message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });

    // Email content
    const mailOptions = {
        from: `"New Inquiry" <${smtpUser}>`,
        to: 'yoga.nachiketa@gmail.com',
        subject: 'Form Submission Details',
        html: `<p>Name: ${Name}</p><p>Email: ${Email}</p><p>Phone Number: ${PhoneNumber}</p><p>Message: ${Message}</p>`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
        header("Location: sent.html");
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.toString() });
    }
};

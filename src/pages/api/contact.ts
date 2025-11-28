import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ContactRequestData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, phone, message }: ContactRequestData = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields: Full Name, Email, or Phone.' });
  }

  // Directly set your email for Handicrafts Store
  const recipientEmail = 'yashdudani098@gmail.com';
  const projectType = 'Handmade Haven Handicrafts Store';

  // --- Configure NodeMailer Transporter ---
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // --- Construct Email Content ---
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipientEmail,
    subject: `New Inquiry from ${fullName} - ${projectType}`,
    html: `
      <h2>New Client Inquiry:</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message Details:</strong></p>
      <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px; white-space: pre-wrap;">${message}</pre>
      <hr>
      <p><em>Inquiry submitted from the ${projectType} website.</em></p>
    `,
  };

  // --- Send Email ---
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('NodeMailer Error:', error);
    res.status(500).json({ 
      message: 'Failed to send email via server.',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
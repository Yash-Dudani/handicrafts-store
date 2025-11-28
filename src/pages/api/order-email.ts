import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface OrderItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  items: OrderItem[];
  totalAmount: number;
  orderId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    city,
    state,
    pincode,
    paymentMethod,
    items,
    totalAmount,
    orderId
  }: OrderData = req.body;

  // Validate required fields
  if (!customerName || !customerEmail || !customerPhone || !shippingAddress) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Configure NodeMailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Create items HTML
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.title}</strong><br>
        <span style="color: #666;">Quantity: ${item.quantity}</span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ${item.price}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${parseInt(item.price.replace('₹', '')) * item.quantity}
      </td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'yashdudani098@gmail.com', // Your business email
    subject: `New Order #${orderId} - Handmade Haven`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fdfbf7; padding: 20px;">
        <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #7D4F2C; margin: 0; font-size: 28px;">🎉 New Order Received!</h1>
            <p style="color: #666; margin: 5px 0;">Order ID: <strong>#${orderId}</strong></p>
          </div>

          <!-- Customer Information -->
          <div style="background: #f9f5f1; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #7D4F2C; margin-top: 0;">Customer Details</h2>
            <table style="width: 100%;">
              <tr>
                <td style="padding: 5px 0;"><strong>Name:</strong></td>
                <td>${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong>Email:</strong></td>
                <td>${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong>Phone:</strong></td>
                <td>${customerPhone}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;"><strong>Payment Method:</strong></td>
                <td>${paymentMethod}</td>
              </tr>
            </table>
          </div>

          <!-- Shipping Address -->
          <div style="background: #f0f8f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #2c2c2c; margin-top: 0;">📦 Shipping Address</h2>
            <p style="margin: 0;">
              ${shippingAddress}<br>
              ${city}, ${state} - ${pincode}
            </p>
          </div>

          <!-- Order Items -->
          <div style="margin-bottom: 20px;">
            <h2 style="color: #7D4F2C; margin-bottom: 15px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f9f5f1;">
                  <th style="padding: 10px; text-align: left;">Image</th>
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <!-- Order Summary -->
          <div style="background: #7D4F2C; color: white; padding: 20px; border-radius: 8px; text-align: center;">
            <h2 style="margin: 0 0 10px 0; font-size: 24px;">Order Total: ₹${totalAmount}</h2>
            <p style="margin: 0; opacity: 0.9;">Thank you for your business! 🎨</p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0;">
              Handmade with love ❤️<br>
              <strong>Handmade Haven</strong>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Order email sent successfully!' });
  } catch (error) {
    console.error('NodeMailer Error:', error);
    res.status(500).json({ 
      message: 'Failed to send order email.',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
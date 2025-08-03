import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔐 Google Auth Setup
let auth;
try {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
} catch (err) {
  console.error('❌ Google Auth Error:', err.message);
}

// ✅ Health Route
app.get('/', (req, res) => {
  res.status(200).send('📸 Crazy Capture Studio backend is running!');
});

// 📩 Contact Form API
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, comment, eventName } = req.body;

  if (!name || !email || !phone || !comment || !eventName) {
    return res.status(400).json({ success: false, message: '❌ All fields are required' });
  }

  const timestamp = new Date().toISOString();

  // ✅ Save to Google Sheets (correct order & sheet name)
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'contact!A1:F1', // 👈 lowercase sheet name
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[name, email, phone, eventName, comment, timestamp]], // 👈 correct order
      },
    });
    console.log('✅ Contact saved to Google Sheets');
  } catch (err) {
    console.error('❌ Sheets error:', err.message);
    return res.status(500).json({ success: false, message: 'Google Sheets save failed' });
  }

  // ✉️ Email Transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 📤 Notify Crazy Capture Studio
  try {
    await transporter.sendMail({
      from: `"Crazy Capture Studio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📸 New Inquiry - ${eventName} by ${name}`,
      html: `
        <h2>New Photography Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event:</strong> ${eventName}</p>
        <p><strong>Message:</strong> ${comment}</p>
        <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
      `,
    });
    console.log('📨 Admin notified');
  } catch (err) {
    console.error('❌ Admin email failed:', err.message);
  }

  // 📥 Auto-reply to Client
  try {
    await transporter.sendMail({
      from: `"Crazy Capture Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `📷 We've received your inquiry for ${eventName}`,
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to <strong>Crazy Capture Studio</strong> about your <strong>${eventName}</strong>.</p>
        <p>Your message has been received and our team will get in touch with you shortly to discuss your photography needs.</p>
        <br/>
        <div style="padding: 10px; border-left: 4px solid #4f46e5; background: #f3f4f6;">
          <strong>Then :</strong> Crazy Capture Studio Team
        </div>
        <p style="font-size: 0.9rem; color: gray;">📸 Capturing Moments. Creating Memories.</p>
      `,
    });
    console.log('📨 Auto-reply sent');
  } catch (err) {
    console.error('❌ Auto-reply failed:', err.message);
  }

  res.status(200).json({ success: true, message: '✅ Message received and emails sent' });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`📸 Crazy Capture Studio server running at http://localhost:${PORT}`);
});

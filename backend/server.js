import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import feedbackRoutes from "./feedbackRoutes.js"; // 👈 feedback/testimonial routes

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// 🔐 Google Auth Setup (initialize once)
let auth;
try {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  console.log("✅ Google Auth initialized");
} catch (err) {
  console.error("❌ Google Auth Error:", err.message);
}

// ✉️ Create global email transporter (initialize once)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Health Check
app.get("/", (req, res) => {
  res.status(200).send("📸 Crazy Capture Studio backend is running!");
});

// 📩 Contact Form API
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, comment, eventName } = req.body;

  if (!name || !email || !phone || !comment || !eventName) {
    return res
      .status(400)
      .json({ success: false, message: "❌ All fields are required" });
  }

  const timestamp = new Date().toISOString();
  const sheets = google.sheets({ version: "v4", auth });

  // 📤 Prepare email templates
  const adminMail = {
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
  };

  const autoReplyMail = {
    from: `"Crazy Capture Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `📷 We've received your inquiry for ${eventName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #e0e0e0; border-radius: 10px;">
        <div style="background: #4f46e5; color: white; padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/dxm3glvjq/image/upload/v1755182171/Crazylogo_incyc5.jpg" 
              alt="Crazy Capture Studio" width="120" 
              style="border-radius: 50%; margin-bottom: 10px;" />
          <h2 style="margin:0; font-size: 1.5rem;">Crazy Capture Studio</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to <strong>Crazy Capture Studio</strong> regarding your <strong>${eventName}</strong>.</p>
          <p>We’ve received your message and our team will contact you soon.</p>
          <div style="margin: 20px 0; padding: 15px; background: #f3f4f6; border-left: 4px solid #4f46e5;">
            <strong>Warm regards,</strong><br/>
            <em>Parabakaran</em><br/>
            Founder & CEO, Crazy Capture Studio
          </div>
          <p style="font-size: 0.9rem; color: gray;">📸 Capturing Moments. Creating Memories.</p>
        </div>
        <div style="background: #f9fafb; padding: 15px; text-align: center; font-size: 0.8rem; color: #666;">
          <p>Visit our website: <a href="https://crazy-capture-studio.vercel.app" style="color:#4f46e5; text-decoration:none;">crazy-capture-studio.vercel.app</a></p>
        </div>
      </div>
    `,
  };

  // ✅ Respond to frontend immediately (~1 sec)
  res.status(200).json({
    success: true,
    message: "✅ Message received and will be processed shortly",
  });

  // 🕐 Delay heavy tasks (Sheets + Emails) by 5 seconds
  setTimeout(() => {
    Promise.allSettled([
      sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "contact!A1:F1",
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[name, email, phone, eventName, comment, timestamp]],
        },
      }),
      transporter.sendMail(adminMail),
      transporter.sendMail(autoReplyMail),
    ])
      .then((results) => {
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            console.log(
              [
                "✅ Saved to Google Sheets",
                "📨 Admin notified",
                "📨 Auto-reply sent",
              ][index]
            );
          } else {
            console.error(
              [
                "❌ Sheets error",
                "❌ Admin email failed",
                "❌ Auto-reply failed",
              ][index],
              result.reason.message
            );
          }
        });
      })
      .catch((err) =>
        console.error("❌ Background task error:", err.message)
      );
  }, 5000); // ⏱️ Delay = 5000 ms (5 seconds)
});

// ✅ Feedback/Testimonial API
app.use("/api/feedback", feedbackRoutes);

// 🛑 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// 🚀 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `📸 Crazy Capture Studio server running at http://localhost:${PORT}`
  );
});

import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// ✅ Setup Google Auth
let auth;
try {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
} catch (err) {
  console.error('❌ Google Auth Error in feedbackRoutes:', err.message);
}

// ✅ Rating map for converting text to number
const ratingMap = {
  'FIVE': 5,
  'FOUR': 4,
  'THREE': 3,
  'TWO': 2,
  'ONE': 1,
};

router.get('/', async (req, res) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth });

    // ✅ Fetch data from columns F2 to I in the 'feedback' tab
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'feedback!F2:I', // F: Rating, G: Comment, H: Name, I: Date
    });

    const rows = response.data.values || [];

    // ✅ Map each row to your testimonial object
    const reviews = rows.map((row, index) => {
      const rawRating = row[0]?.toUpperCase() || 'FIVE';
      const rating = ratingMap[rawRating] || 5;

      return {
        id: index,
        rating, // ✅ numeric rating
        comment: row[1] || '',
        description: row[2] || 'Anonymous',
        image: (row[2] || 'A').charAt(0).toUpperCase(),
        date: row[3] || new Date().toLocaleDateString(),
      };
    });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('❌ Error fetching feedback:', error.message);
    res.status(500).json({ message: 'Failed to fetch feedback' });
  }
});

export default router;

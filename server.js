const express = require("express");
const { Pool } = require("pg");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});

// Analyze customer feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Feedback message is required",
      });
    }

    const prompt = `
You are Cafe Pulse, an AI assistant helping cafe managers
understand customer feedback.

Analyze the following customer feedback:

"${message}"

Return ONLY valid JSON in exactly this format:

{
  "sentiment": "positive",
  "category": "service",
  "severity": 3,
  "summary": "Short summary of the feedback",
  "suggested_action": "One practical action for cafe staff"
}

Rules:
- sentiment must be positive, neutral, or negative
- category must be one of: service, food, noise, seating, cleanliness, wifi, other
- severity must be an integer from 1 to 5
- summary should be short
- suggested_action should be practical and concise
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const analysis = JSON.parse(response.text);

    await pool.query(
      `
      INSERT INTO feedback
      (message, sentiment, category, severity, summary, suggested_action)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        message,
        analysis.sentiment,
        analysis.category,
        analysis.severity,
        analysis.summary,
        analysis.suggested_action,
      ]
    );

    res.json(analysis);

  } catch (error) {
    console.error("Feedback error:", error);

    res.status(500).json({
      error: "Failed to analyze feedback",
      details: error.message,
    });
  }
});

// Get recent feedback
app.get("/api/feedback", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM feedback
      ORDER BY created_at DESC
      LIMIT 50
    `);

    res.json(result.rows);

  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      error: "Failed to fetch feedback",
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Cafe Pulse running on port ${PORT}`);
});


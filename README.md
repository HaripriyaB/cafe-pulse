# Cafe Pulse — AI-Powered Café Intelligence

## Idea

**Cafe Pulse** is an AI-powered feedback and operations assistant for cafés.

Instead of simply collecting customer reviews, Cafe Pulse uses **Google Gemini** to analyze real-time customer feedback and identify what is happening inside the café — such as long wait times, excessive noise, seating issues, or positive experiences.

It converts unstructured customer comments into **actionable insights for café teams**.

### Example

A customer submits:

> “I waited 20 minutes for my coffee and the cafe is really noisy today.”

Gemini analyzes the feedback and identifies:

- **Sentiment:** Negative
- **Category:** Service
- **Severity:** 4/5
- **Summary:** Customer experienced a long wait.
- **Recommended action:** Consider increasing beverage preparation capacity during busy periods.

The café manager can then see this alongside feedback from other customers and understand the **current pulse of the café**.

---

## How It Works

```text
Customer Feedback
       ↓
   Cloud Run
       ↓
   Gemini API
       ↓
Sentiment + Category
Severity + Summary
Recommended Action
       ↓
   Cloud SQL
       ↓
Cafe Pulse Dashboard
```

### 1. Customer submits feedback
Customers provide quick natural-language feedback about their experience.

### 2. Gemini analyzes the feedback
Google Gemini extracts structured information such as:

- Sentiment
- Feedback category
- Severity
- Short summary
- Recommended action

### 3. Feedback is stored
The structured analysis and original feedback are stored in **Cloud SQL (PostgreSQL)**.

### 4. Dashboard aggregates insights
The café team sees:

- Overall customer mood
- Most common problems
- Recent feedback
- Trending issues
- AI-generated operational recommendations

### 5. AI identifies operational problems

For example, if several recent customers mention slow service, Cafe Pulse can surface:

> **🔥 Top Issue: Increasing wait times**

and recommend:

> “Consider assigning additional staff to beverage preparation during peak hours.”

---

# Technology Stack

| Technology | Purpose |
|---|---|
| **Google Cloud Run** | Hosts the application and backend API |
| **Google Gemini API / Vertex AI** | Analyzes feedback and generates insights |
| **Google Cloud SQL** | PostgreSQL database for feedback and analytics |
| **Node.js** | Backend application |
| **Express.js** | REST API |
| **HTML/CSS/JavaScript** | Frontend dashboard |
| **PostgreSQL** | Persistent data storage |

---

## Key Value

Cafe Pulse helps café teams move from:

**“We have customer feedback.”**

to:

**“We understand what is happening in our café right now and what we should do about it.”**

### Tagline

> **Cafe Pulse — Don't just collect feedback. Understand the room.**

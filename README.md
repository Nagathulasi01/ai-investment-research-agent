# AI Investment Research Agent

A beginner-friendly internship-ready investment research application with a modern React + Vite frontend and a lightweight Node.js backend workflow.

## Overview

This project delivers a responsive dashboard for entering a company name, retrieving an AI-style research report, and reviewing investment insights. The backend is structured to support a LangGraph/LangChain-inspired workflow with validation, profile lookup, and formatted analysis.

## Features

- Responsive React dashboard UI
- Modern navbar, cards, search box, and results section
- Loading spinner with error handling
- Structured backend route and workflow architecture
- Preloaded company profiles with fallback analysis
- Beginner-friendly and lightweight codebase

## Setup Steps

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Then open the frontend URL shown by Vite (usually `http://localhost:5173`).

## Folder Structure

```text
aI-investment-agent/
+-- backend/
¦   +-- routes/
¦   ¦   +-- analyze.js
¦   +-- services/
¦   ¦   +-- geminiService.js
¦   +-- langgraphAgent.js
¦   +-- server.js
¦   +-- package.json
¦   +-- .env
+-- frontend/
¦   +-- src/
¦   ¦   +-- App.jsx
¦   ¦   +-- App.css
¦   ¦   +-- index.css
¦   ¦   +-- main.jsx
¦   +-- package.json
¦   +-- index.html
+-- README.md
```

## API Routes

- `GET /` - Health check route
- `POST /api/analyze` - Request investment analysis for a company

### Request Body

```json
{
  "company": "Apple"
}
```

### Response Example

```json
{
  "success": true,
  "analysis": "...formatted investment report..."
}
```

## Architecture

The backend follows a simple workflow:

1. Input validation
2. Company profile assembly from preloaded data
3. Analysis formatting
4. Response output

This makes it easy to extend later with a real LangGraph or LangChain pipeline.

## Example Outputs

```text
==============================
COMPANY: Apple
==============================

?? COMPANY SUMMARY
Apple is a strong technology company with global presence.

--------------------------------
? STRENGTHS
- Strong brand value
- High customer loyalty
- Stable revenue growth

--------------------------------
?? RISKS
- Market competition
- Regulatory pressure

--------------------------------
?? INVESTMENT DECISION
INVEST

==============================
```

## Future Improvements

- Add real Gemini or OpenAI integration
- Replace hardcoded profiles with external data sources
- Add user authentication and saved analysis history
- Add charts and trend visualizations
- Deploy using Docker or cloud hosting

## Deployment Steps

Recommended deployment flow:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the frontend statically or serve through the backend.
3. Start the backend:
   ```bash
   cd backend
   npm start
   ```
4. Configure production environment variables and CORS as needed.

# SkillSetGo 🚀

**SkillSetGo** is an AI-powered career-readiness platform designed to
help students prepare for job opportunities. It brings resume feedback,
skill-gap analysis, interview practice, communication coaching, and a
personalized improvement roadmap into one place.

## Features

-   **Resume analysis:** Upload a PDF or DOCX resume and select a target
    role to receive an AI-generated summary, strengths, skill gaps,
    resume feedback, and priority actions.
-   **Technical interview practice:** Practice role-focused, multi-turn
    technical interview questions and receive feedback.
-   **English and communication coach:** Use spoken-answer transcription
    in supported browsers and receive feedback on fluency, grammar,
    clarity, filler words, and ways to improve an answer.
-   **Behavioral interview practice:** Prepare for common behavioral
    interview questions.
-   **Career dashboard:** View readiness information and score
    breakdowns.
-   **Personalized learning roadmap:** Get a four-week improvement
    roadmap based on your target role and identified gaps.
-   **Frontend demo mode:** The frontend includes mock-data fallback for
    supported API calls, so parts of the interface can be explored even
    when the backend is not running.

## Tech Stack

**Frontend** - React - Vite - Tailwind CSS - React Router - Lucide React

**Backend** - Python - FastAPI - Uvicorn - Google Gemini API
(`google-genai`) - `pdfplumber` and `python-docx` for resume text
extraction - `python-dotenv` for local environment configuration

## Project Structure

``` text
skillsetgo-org/
├── backend/
│   ├── main.py
│   ├── llm.py
│   ├── resume_parser.py
│   ├── requirements.txt
│   └── API_CONTRACT.md
├── skillsetgo/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install: - [Node.js](https://nodejs.org/) (includes npm) -
[Python](https://www.python.org/) 3.10 or a compatible version for the
dependencies - A Google Gemini API key to use the AI-powered backend
features

### 1. Clone the repository

``` bash
git clone https://github.com/riya-umesh-singh/SkillSetGo.git
cd SkillSetGo
```

### 2. Set up the backend

Open a terminal in the repository root:

``` powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a file named `.env` inside the `backend` folder and add your own
API key:

``` env
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder with your own key. **Do not commit or share your
`.env` file or API key.**

Start the API:

``` powershell
uvicorn main:app --reload
```

The backend runs locally at `http://localhost:8000`. Open
`http://localhost:8000/docs` to explore the interactive FastAPI
documentation.

> If PowerShell blocks virtual-environment activation, you can use
> Command Prompt to activate it with `.venv\Scripts\activate.bat`, or
> run the environment's Python executable directly.

### 3. Set up the frontend

Open a **second terminal** from the repository root:

``` bash
cd skillsetgo
npm install
npm run dev
```

Vite will print the local development URL in the terminal (commonly
`http://localhost:5173`). Open that URL in your browser.

The frontend API base URL is configured in `skillsetgo/src/config.js`
and defaults to `http://localhost:8000`.

## Backend API Overview

  ------------------------------------------------------------------------
  Method                  Endpoint                 Purpose
  ----------------------- ------------------------ -----------------------
  `GET`                   `/api/health`            Check whether the API
                                                   is running

  `POST`                  `/api/resume/analyze`    Analyze a resume for a
                                                   target role

  `POST`                  `/api/interview/chat`    Start or continue a
                                                   technical interview

  `POST`                  `/api/interview/score`   Score a completed
                                                   technical interview

  `POST`                  `/api/english/analyze`   Evaluate a
                                                   spoken-answer
                                                   transcript

  `POST`                  `/api/dashboard`         Return readiness scores
                                                   and a personalized
                                                   roadmap
  ------------------------------------------------------------------------

For request and response examples, see
[`backend/API_CONTRACT.md`](backend/API_CONTRACT.md).

## Security Notes

-   Keep API keys in `backend/.env`; never place real secrets in source
    code.
-   The repository's `.gitignore` excludes `.env` files and common
    generated folders.
-   The backend currently stores session data in memory, so sessions are
    temporary and are cleared when the backend process restarts.
-   Review and restrict the backend's CORS settings before deploying
    publicly.

## Current Limitations

-   AI-powered features require a valid Gemini API key and a working
    network connection.
-   Browser speech recognition support depends on the browser and
    device.
-   Backend session data is stored in memory rather than a persistent
    database.
-   Deployment configuration and a live demo URL are not included yet.

## Future Improvements

-   Add persistent database storage and user authentication.
-   Deploy the frontend and backend.
-   Add automated tests and more detailed error handling.
-   Add screenshots and a demo video.

## Author

**Riya Singh**

GitHub: [@riya-umesh-singh](https://github.com/riya-umesh-singh)

------------------------------------------------------------------------

If you find the project useful, feel free to explore the code and share
feedback.

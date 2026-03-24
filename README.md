# 🔍 Perplexity Clone

**An AI-powered search and chat application — built from scratch.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)

A full-stack clone of [Perplexity AI](https://www.perplexity.ai/) featuring real-time streaming, intelligent web-aware answers, and a polished modern UI.

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 🧠 **Intelligent Search** | Combines LLMs (Gemini / Mistral) with live web data via Tavily |
| ⚡ **Real-time Streaming** | Responses stream token-by-token using Socket.io |
| 🔐 **Authentication** | Secure sign-up & login with JWT and bcrypt |
| 🎨 **Modern UI** | Smooth Framer Motion animations, fully responsive design |
| 📝 **Rich Markdown** | Answers rendered with syntax highlighting and GFM support |

---

## 🏗️ Tech Stack

### Frontend

| Technology | Purpose |
| :--- | :--- |
| React 19 (Vite) | UI framework & build tool |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Redux Toolkit | Global state management |
| React Router v7 | Client-side routing |
| Socket.io-client | Real-time communication |
| React Markdown + Remark GFM | Markdown rendering |

### Backend

| Technology | Purpose |
| :--- | :--- |
| Node.js + Express.js | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| LangChain (Gemini / Mistral) | LLM integration |
| Tavily Search API | Live web search |
| Socket.io | Real-time streaming |
| JWT + bcrypt | Authentication & security |

---

## 📁 Project Structure

```text
Perplexity/
├── 📂 Backend/          # Node.js + Express API server
│   ├── .env             # Environment variables (create this)
│   └── ...
└── 📂 Frontend/         # React + Vite client application
    └── ...
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed and ready:

- **[Node.js](https://nodejs.org/)** (LTS version recommended)
- **[VS Code](https://code.visualstudio.com/)** (recommended editor)
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** — free cloud database
- API keys from:
  - [Google Gemini](https://aistudio.google.com/)
  - [Mistral AI](https://console.mistral.ai/)
  - [Tavily Search](https://tavily.com/)

---

### ⚙️ Backend Setup

1. **Open a terminal** and navigate to the Backend folder:
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create your environment file** — create a file named `.env` in the `Backend` folder and populate it:

   ```env
   # Server
   PORT=3000

   # Database
   MONGODB_URI=your_mongodb_connection_string_here

   # Security (use any random string)
   JWT_SECRET=any_random_secret_password_here

   # Google OAuth (for email)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REFRESH_TOKEN=your_google_refresh_token
   GOOGLE_USER=your_email@gmail.com

   # AI & Search APIs
   GEMINI_API_KEY=your_gemini_api_key_here
   MISTRAL_API_KEY=your_mistral_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   ✅ You should see: `Server running on port 3000`

   > **Keep this terminal open.**

---

### 🎨 Frontend Setup

1. **Open a second terminal** and navigate to the Frontend folder:
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   ✅ Visit [`http://localhost:5173`](http://localhost:5173) in your browser.

---

## 🎉 You're All Set!

You should now have two terminals running:

```text
Terminal 1 (Backend)  → npm run dev  in /Backend   → localhost:3000
Terminal 2 (Frontend) → npm run dev  in /Frontend  → localhost:5173
```

Open `http://localhost:5173` in your browser and start exploring!

---

> **Next time you want to run the project**, just open VS Code and repeat the `npm run dev` steps for both Backend and Frontend.
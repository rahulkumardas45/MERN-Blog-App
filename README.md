# 🚀  MERN Blogging Platform

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue.svg?style=for-the-badge" alt="MERN Stack">
  <img src="https://img.shields.io/badge/AI-Integrated-orange.svg?style=for-the-badge" alt="AI">
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License">
</p>

**Blogging Platform** is a full-featured blogging ecosystem built with the MERN stack. It bridges the gap between traditional content creation and Artificial Intelligence, offering users a seamless way to write, interact, and discover content.



---

## ✨ Core Features

### 🤖 Smart Content (AI Powered)
* **AI Writing Assistant**: Generate post ideas or complete paragraphs using integrated AI.
* **Auto-Summarization**: Automatically generate meta-descriptions and summaries for long-form content.
* **Smart Tagging**: AI suggests categories and tags based on your content.

### ✍️ Creator Tools
* **Rich Text Editor**: Create beautiful posts with a modern UI.
* **Interactive Socials**: Like, share, and engage with threaded comments.
* **Dynamic Search**: Instant filtering by author, category, or keywords.

### 🛡️ Security & Performance
* **JWT Authentication**: Secure user sessions and protected routes.
* **Cloudinary Integration**: Fast and optimized image hosting.
* **Responsive Layout**: Perfectly optimized for Mobile, Tablet, and Desktop.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **AI Engine** | OpenAI API / Gemini API |
| **Auth** | JSON Web Tokens (JWT) & Bcrypt.js |

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js (v16+)
* MongoDB Account
* AI Provider API Key (OpenAI/Gemini)



###3. Installation
# Clone the project
* git clone https://github.com/rahulkumardas45/MERN-Blog-App.git
* cd MERN-Blog-App

# Setup Backend
* cd api
* npm install
* npm run dev

# Setup Frontend
* cd ../client
* npm install
* npm run dev

📂 Project Structure
## 📂 Project Architecture

Based on the project structure, the application is split into a clear **Api** (Backend) and **client** (Frontend) separation:

```text
.
├── Api/                 # Backend (Node/Express)
│   ├── config/          # Database & Cloud configurations
│   ├── controllers/     # Request handlers (Logic)
│   ├── helpers/         # Utility functions
│   ├── middleware/      # Auth & Security checks
│   ├── models/          # MongoDB Schemas
│   ├── routes/          # API Endpoints
│   └── index.js         # Entry point
├── client/              # Frontend (React/Vite)
│   ├── src/             # React components & hooks
│   ├── public/          # Static assets
│   └── vite.config.js   # Build configuration
└── vercel.json          # Deployment settings


